import CorretorModel from "../models/CorretorModel";
import { Request, Response } from "express";

export default class CorretorController {
  static async getAll(req: Request, res: Response) {
    try {
      const corretor = await CorretorModel.findAll({
        attributes: { exclude: ["password"] },
        order: [["id", "ASC"]],
      });
      return res.status(200).json(corretor);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const corretor = await CorretorModel.findByPk(Number(id));
      if (!corretor) {
        return res.status(404).json({ message: "Corretor não encontrado" });
      }
      return res.json(corretor);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async create(req: Request, res: Response) {
    const date = new Date();
    console.log(date);
    try {
      const { name, password, creci, email, tel } = req.body;
      const corretor = await CorretorModel.create({
        name,
        password,
        creci,
        email,
        tel,
        createdAt: date,
        updatedAt: date,
      });
      return res.status(201).json(corretor);
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao criar corretor", err: err });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const date = new Date();
      const { id } = req.params;
      const { name, password, creci, email, tel } = req.body;
      const corretor = await CorretorModel.update(
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
      return res.status(200).json({ message: "Corretor atualizado com sucesso" });
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao atualizar corretor", err: err });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const corretor = await CorretorModel.destroy({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json({ message: "Corretor deletado com sucesso" });
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao deletar corretor", err: err });
    }
  }
}
