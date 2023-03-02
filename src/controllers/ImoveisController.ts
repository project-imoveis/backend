import { Request, Response } from "express";
import { ImovelRepository } from "../repository/imovelRepository";

export default class ImoveisController {
  static async getAll(req: Request, res: Response) {
    try {
      const imoveis = await ImovelRepository.getAll();
      return res.status(200).json(imoveis);
    } catch (err: any) {
      return res.status(500).send(err);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const imovel = await ImovelRepository.getById(Number(id));
      return res.json(imovel);
    } catch (err: any) {
      return res.status(404).json({ message: "Imovel não encontrado", err: err });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const body = req.body;
      const imovel = await ImovelRepository.create(body);
      return res.status(201).json(imovel);
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao criar imovel", err: err });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const body = req.body;

      const status = await ImovelRepository.update(Number(id), body);

      if (!status) return res.status(404).json({ message: "Imovel não encontrado" });

      return res.json({ message: "Imovel atualizado com sucesso" });
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao atualizar imovel", err: err });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const status = await ImovelRepository.delete(Number(id));

      if (!status) return res.status(404).json({ message: "Imovel não encontrado" });

      return res.json({ message: "Imovel deletado com sucesso" });
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao deletar imovel", err: err });
    }
  }
}
