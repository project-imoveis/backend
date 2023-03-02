import { Request, Response } from "express";
import { ImovelModel } from "../models/ImovelModel";
import { UsuarioModel } from "../models/UsuarioModel";
import { CorretorModel } from "../models/CorretorModel";
import { ImobiliariaModel } from "../models/ImobiliariaModel";
import { PessoaFisicaModel } from "../models/PessoaFisicaModel";
import { PessoaJuridicaModel } from "../models/PessoaJuridicaModel";
import database from "../db/config/db";
import { Sequelize, Transaction } from "sequelize";
export default class UsuarioController {
  static async getAll(req: Request, res: Response) {
    try {
      const usuario = await UsuarioModel.findAll({
        include: [
          { model: CorretorModel, as: "Corretor" },
          { model: ImobiliariaModel, as: "Imobiliaria" },
          { model: PessoaFisicaModel, as: "PessoaFisica" },
          { model: PessoaJuridicaModel, as: "PessoaJuridica" },
        ],
      });
      return res.status(200).json(usuario);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const tiposDeUsuarios = [
        {
          model: CorretorModel,
          as: "Corretor",
          label: "corretor",
        },
        {
          model: ImobiliariaModel,
          as: "Imobiliaria",
          label: "imobiliaria",
        },
        {
          model: PessoaFisicaModel,
          as: "PessoaFisica",
          label: "pessoaFisica",
        },
        {
          model: PessoaJuridicaModel,
          as: "PessoaJuridica",
          label: "pessoaJuridica",
        },
      ];
      const { id } = req.params;
      let usuario = await UsuarioModel.findByPk(Number(id));
      if (!usuario) return res.status(404).json({ message: "usuario não encontrado" });
      let usuarioTipo;
      for (let tiposDeUsuario of tiposDeUsuarios) {
        if (usuario.getDataValue("tipo_de_usuario") == tiposDeUsuario.label) {
          usuarioTipo = await UsuarioModel.findByPk(Number(id), {
            include: { model: tiposDeUsuario.model, as: tiposDeUsuario.as },
          });
        }
      }
      if (!usuarioTipo) return res.status(404).json({ message: "usuario não encontrado" });
      return res.json({ usuarioTipo });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { name, password, email, tel, tipo_de_usuario } = req.body;
      await database.transaction(async (t: Transaction) => {
        const usuario = await UsuarioModel.create(
          {
            name,
            password,
            email,
            tel,
            tipo_de_usuario,
          },
          { transaction: t }
        );
        if (tipo_de_usuario == "corretor") {
          const { creci, cpf } = req.body;
          const corretor = await CorretorModel.create(
            {
              creci,
              cpf,
              id_usuario: usuario.dataValues.id,
            },
            { transaction: t }
          );
          return res.status(201).json({ usuario, corretor });
        } else if (tipo_de_usuario == "imobiliaria") {
          const { cnpj, creci } = req.body;
          const imobiliaria = await ImobiliariaModel.create(
            {
              cnpj,
              creci,
              id_usuario: usuario.dataValues.id,
            },
            { transaction: t }
          );
          return res.status(201).json({ usuario, imobiliaria });
        } else if (tipo_de_usuario == "pessoaFisica") {
          const { cpf } = req.body;
          const pessoaFisica = await PessoaFisicaModel.create(
            {
              cpf,
              id_usuario: usuario.dataValues.id,
            },
            { transaction: t }
          );
          return res.status(201).json({ usuario, pessoaFisica });
        } else if (tipo_de_usuario == "pessoaJuridica") {
          const { cnpj } = req.body;
          const pessoaJuridica = await PessoaJuridicaModel.create(
            {
              cnpj,
              id_usuario: usuario.dataValues.id,
            },
            { transaction: t }
          );
          return res.status(201).json({ usuario, pessoaJuridica });
        }
      });
    } catch (err: any) {
      return res.status(500).json({ defaultMsg: "Erro ao criar usuario", detailMsg: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, password, creci, email, tel, tipo_de_usuario } = req.body;
      await UsuarioModel.update(
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
      if (tipo_de_usuario == "corretor") {
        const { creci, cpf } = req.body;
        await CorretorModel.update(
          {
            creci,
            cpf,
          },
          {
            where: { id_usuario: Number(id) },
          }
        );
      } else if (tipo_de_usuario == "imobiliaria") {
        const { cnpj, creci } = req.body;
        await ImobiliariaModel.update(
          {
            cnpj,
            creci,
          },
          {
            where: { id_usuario: Number(id) },
          }
        );
      } else if (tipo_de_usuario == "pessoaFisica") {
        const { cpf } = req.body;
        await PessoaFisicaModel.update(
          {
            cpf,
          },
          {
            where: { id_usuario: Number(id) },
          }
        );
      } else if (tipo_de_usuario == "pessoaJuridica") {
        const { cnpj } = req.body;
        await PessoaJuridicaModel.update(
          {
            cnpj,
          },
          {
            where: { id_usuario: Number(id) },
          }
        );
      }
      return res.status(200).json({ message: "usuario atualizado com sucesso" });
    } catch (err: any) {
      return res
        .status(500)
        .json({ defaultMsg: "Erro ao atualizar usuario", detailMsg: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await UsuarioModel.destroy({
        where: {
          id: Number(id),
        },
      });

      await UsuarioModel.update(
        {
          ativo: false,
        },
        {
          where: {
            id: Number(id),
          },
          paranoid: false,
        }
      );
      return res.status(200).json({ message: "usuario deletado com sucesso" });
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao deletar usuario", err: err });
    }
  }

  static async restoreById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await UsuarioModel.restore({
        where: {
          id: Number(id),
        },
      });
      await UsuarioModel.update(
        {
          ativo: true,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );
      return res.status(200).json({ message: "usuario restaurado com sucesso" });
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao restaurar usuario", err: err });
    }
  }
}
