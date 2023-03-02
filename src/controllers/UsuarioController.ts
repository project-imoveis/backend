import { Request, Response } from "express";
import { UsuarioRepository } from "../repository/UsuarioRepository";

import database from "../db/config/db";
import { Transaction } from "sequelize";

import Models from "../models";

export default class UsuarioController {
  static async getAll(req: Request, res: Response) {
    try {
      const usuario = await UsuarioRepository.getAll();
      return res.status(200).json(usuario);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioRepository.getbyIdWithType(Number(id));
      if (!usuario) return res.status(404).json({ message: "usuario não encontrado" });
      return res.json({ usuario });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const body = req.body;
      const { usuario, usuarioComTipo } = await UsuarioRepository.create(body);
      const tipoDeUsuario = usuario.getDataValue("tipo_de_usuario");
      return res.status(201).json({ usuario, [tipoDeUsuario]: usuarioComTipo });
    } catch (err: any) {
      return res.status(500).json({ defaultMsg: "Erro ao criar usuario", detailMsg: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;
      await UsuarioRepository.update(Number(id), body);
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

      return res.status(200).json({ message: "usuario deletado com sucesso" });
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao deletar usuario", err: err });
    }
  }

  static async restoreById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Models.Usuario.restore({
        where: {
          id: Number(id),
        },
      });
      await Models.Usuario.update(
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
