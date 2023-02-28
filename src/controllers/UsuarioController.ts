import UsuarioModel from "../models/UsuarioModel";
import { Request, Response } from "express";

export default class UsuarioController {
  static async getAll(req: Request, res: Response) {
    try {
      const usuario = await UsuarioModel.findAll({
        attributes: { exclude: ["password"] },
        order: [["id", "ASC"]],
      });
      return res.status(200).json(usuario);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioModel.findByPk(Number(id));
      if (!usuario) {
        return res.status(404).json({ message: "usuario não encontrado" });
      }
      return res.json(usuario);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async create(req: Request, res: Response) {
    const date = new Date();
    console.log(date);
    try {
      const { name, password, creci, email, tel } = req.body;
      const usuario = await UsuarioModel.create({
        name,
        password,
        creci,
        email,
        tel,
        createdAt: date,
        updatedAt: date,
      });
      return res.status(201).json(usuario);
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao criar usuario", err: err });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const date = new Date();
      const { id } = req.params;
      const { name, password, creci, email, tel } = req.body;
      const usuario = await UsuarioModel.update(
        {
          name,
          password,
          creci,
          email,
          tel,
          updatedAt: date,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );
      return res.status(200).json({ message: "usuario atualizado com sucesso" });
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao atualizar usuario", err: err });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await UsuarioModel.update(
        {
          ativo: false,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );
      const usuario = await UsuarioModel.destroy({
        where: {
          id: Number(id),
        },
      });
      if (!usuario) return res.status(404).json({ message: "usuario não encontrado" });
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
      return res.status(200).json({ message: "usuario restaurado com sucesso" });
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao restaurar usuario", err: err });
    }
  }
}
