import Models from "../models";
import database from "../db/config/db";
import { Transaction } from "sequelize";

export class UsuarioRepository {
  static async getAll() {
    const imoveis = await Models.Usuario.findAll({
      include: [
        { model: Models.Corretor, as: "Corretor" },
        { model: Models.Imobiliaria, as: "Imobiliaria" },
        { model: Models.PessoaFisica, as: "PessoaFisica" },
        { model: Models.PessoaJuridica, as: "PessoaJuridica" },
      ],
    });
    return imoveis;
  }
  static async getById(id: number) {
    const Usuario = await Models.Usuario.findByPk(id);
    return Usuario;
  }

  static async getbyIdWithType(id: number) {
    const usuario = await this.getById(Number(id));
    if (!usuario) return usuario;
    const tipoDeUsuario = usuario.getDataValue("tipo_de_usuario");
    const usuarioComTipo = await Models.Usuario.findByPk(Number(id), {
      include: { model: (Models as any)[tipoDeUsuario], as: tipoDeUsuario },
    });
    return usuarioComTipo;
  }
  static async create(body: any) {
    const { name, password, email, tel, tipo_de_usuario, creci, cpf, cnpj } = body;
    return database.transaction(async (t: Transaction) => {
      const usuario = await Models.Usuario.create(
        {
          name,
          password,
          email,
          tel,
          tipo_de_usuario,
        },
        { transaction: t }
      );
      const usuarioComTipo = await (Models as any)[tipo_de_usuario].create(
        {
          creci: creci || null,
          cpf: cpf || null,
          cnpj: cnpj || null,
          id_usuario: usuario.dataValues.id,
        },
        { transaction: t }
      );
      return { usuario, usuarioComTipo };
    });
  }
  static async update(id: number, body: any) {
    const { name, password, email, tel, tipo_de_usuario, creci, cpf, cnpj } = body;
    await Models.Usuario.update(
      {
        name,
        password,
        creci,
        email,
        tel,
        tipo_de_usuario,
      },
      {
        where: {
          id: Number(id),
        },
      }
    );
    await (Models as any)[tipo_de_usuario].update(
      {
        creci: creci || null,
        cpf: cpf || null,
        cnpj: cnpj || null,
      },
      {
        where: { id_usuario: Number(id) },
      }
    );
  }

  static async delete(id: number) {
    return database.transaction(async (t: Transaction) => {
      await Models.Usuario.destroy({
        where: {
          id: Number(id),
        },
        force: true,
        transaction: t,
      });

      await Models.Usuario.update(
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
