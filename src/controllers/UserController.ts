import { Request, Response } from "express";
import { UserRepository } from "../repository/UserRepository";
import Models from "../models";

export default class UserController {
  static async getAll(req: Request, res: Response) {
    try {
      const user = await UserRepository.getAll();
      return res.status(200).json(user);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserRepository.getbyIdWithType(Number(id));
      if (!user) throw new Error();
      return res.status(200).json(user);
    } catch (err: any) {
      return res
        .status(404)
        .json({ message: `Não foi possivel encontrar o user ${req.params.id}`, err: err });
    }
  }
  static async getByIdWithProperties(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserRepository.getByIdWithProperties(Number(id));
      return res.status(200).json(user);
    } catch (err: any) {
      return res
        .status(404)
        .json({ message: `Não foi possivel encontrar o user ${req.params.id}`, err: err });
    }
  }
  static async register(req: Request, res: Response) {
    try {
      const body = req.body;
      const { user, userWithType } = await UserRepository.register(body);
      const userType = user.getDataValue("user_type");
      return res.status(201).json({ user, [userType]: userWithType });
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao criar usuario", err: err.message });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;
      await UserRepository.update(Number(id), body);
      return res.status(200).json({ message: "usuario atualizado com sucesso" });
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao atualizar usuario", err: err });
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserRepository.login(email, password);
      if (!user) throw new Error();
      return res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: "Email ou senha incorretos" });
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
      await Models.User.restore({
        where: {
          id: Number(id),
        },
      });
      await Models.User.update(
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
