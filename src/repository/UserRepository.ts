import { IUserResponse } from "../models/UserModel";
import Models from "../models";
import database from "../db/config/db";
import { Transaction } from "sequelize";
import { AuthServices } from "../services/auth";

export class UserRepository {
  static async getAll() {
    return await Models.User.findAll({
      include: [
        { model: Models.Corretor, as: "Corretor" },
        { model: Models.Imobiliaria, as: "Imobiliaria" },
        { model: Models.NaturalPerson, as: "NaturalPerson" },
        { model: Models.LegalPerson, as: "LegalPerson" },
      ],
    });
  }
  static async getById(id: number) {
    return await Models.User.findByPk(id);
  }
  static async getByAtributo(atributo: string, value: string) {
    return await Models.User.scope("verifyPassword").findOne({
      where: {
        [atributo]: value,
      },
    });
  }

  static async getbyIdWithType(id: number) {
    const user = await this.getById(Number(id));
    if (!user) return user;
    const tipoDeUser = user.getDataValue("user_type");
    const usuarioComTipo = await Models.User.findByPk(Number(id), {
      include: { model: (Models as any)[tipoDeUser], as: tipoDeUser },
    });
    return usuarioComTipo;
  }

  static async update(id: number, body: any) {
    const { name, password, email, telefone, user_type, creci, cpf, cnpj } = body;
    await Models.User.update(
      {
        name,
        password,
        email,
        telefone,
        user_type,
      },
      {
        where: {
          id: Number(id),
        },
      }
    );
    await (Models as any)[user_type].update(
      {
        creci: creci || null,
        cpf: cpf || null,
        cnpj: cnpj || null,
      },
      {
        where: { user_id: Number(id) },
      }
    );
  }
  static async login(email: string, password: string) {
    const userExists = await this.getByAtributo("email", email);
    if (!userExists) {
      console.log("usuario não existe!");
      return null;
    }
    const passwordMatch = await AuthServices.ComparePassword(
      password,
      userExists.getDataValue("password")
    );
    if (!passwordMatch) {
      console.log("senhas não batem!");
      return null;
    }
    const user: IUserResponse = {
      id: userExists.getDataValue("id"),
      name: userExists.getDataValue("name"),
      email: userExists.getDataValue("email"),
      user_type: userExists.getDataValue("user_type"),
    };

    const token = AuthServices.GenerateToken(user);

    return { user, token };
  }
  static async register(body: any) {
    const { name, password, email, telefone, user_type, creci, cpf, cnpj } = body;

    const passwordHashed = await AuthServices.HashPassword(password);
    const userHashed = {
      name,
      password: passwordHashed,
      email,
      telefone,
      user_type,
    };

    return database.transaction(async (t: Transaction) => {
      const user = await Models.User.create(userHashed, { transaction: t, exclude: "password" });
      const userWithTypeValues = {
        creci: creci || null,
        cpf: cpf || null,
        cnpj: cnpj || null,
        user_id: user.getDataValue("id"),
      };

      const userWithType = await (Models as any)[user_type].create(userWithTypeValues, {
        transaction: t,
      });
      const token = AuthServices.GenerateToken(user);

      return { user, userWithType, token };
    });
  }

  static async delete(id: number) {
    return database.transaction(async (t: Transaction) => {
      await Models.User.destroy({
        where: {
          id: Number(id),
        },
        force: true,
        transaction: t,
      });

      await Models.User.update(
        {
          ativo: false,
        },
        {
          where: {
            id: Number(id),
          },
          paranoid: false,
          transaction: t,
        }
      );
    });
  }
}
