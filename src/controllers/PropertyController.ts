import { Request, Response } from "express";
import { PropertyRepository } from "../repository/PropertyRepository";

export default class PropertiesController {
  static async getAll(req: Request, res: Response) {
    try {
      const imoveis = await PropertyRepository.getAll();
      return res.status(200).json(imoveis);
    } catch (err: any) {
      return res.status(500).send(err);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const property = await PropertyRepository.getById(Number(id));
      if (!property) throw new Error();
      return res.status(200).json(property);
    } catch (err: any) {
      return res
        .status(404)
        .json({ message: `Não foi possivel encontrar o imovel ${req.params.id}`, err: err });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const body = req.body;
      const property = await PropertyRepository.create(body);
      return res.status(201).json(property);
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao criar imovel", err: err });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { body } = req;
      const { id } = req.params;
      const status = await PropertyRepository.update(Number(id), body);
      if (!status) throw new Error("Imovel não encontrado");
      return res.json({ message: "Imovel atualizado com sucesso" });
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao atualizar imovel", err: err });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const status = await PropertyRepository.delete(Number(id));
      if (!status) throw new Error("Imovel não encontrado");
      return res.json({ message: "Imovel deletado com sucesso" });
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao deletar imovel", err: err });
    }
  }
}
