import ImovelModel from "../models/ImovelModel";
import { Request, Response } from "express";

export default class ImoveisController {
  static async getAll(req: Request, res: Response) {
    try {
      const imoveis = await ImovelModel.findAll({ order: [["id", "ASC"]] });
      return res.status(200).json(imoveis);
    } catch (err: any) {
      return res.status(500).send(err);
    }
  }
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const imovel = await ImovelModel.findByPk(Number(id));

      if (!imovel) return res.status(404).json({ message: "Imovel não encontrado" });

      return res.json(imovel);
    } catch (err: any) {
      return res.status(404).json({ message: "Imovel não encontrado", err: err });
    }
  }
  static async create(req: Request, res: Response) {
    try {
      const date = new Date();
      const {
        id_corretor,
        titulo,
        descricao,
        valor,
        iptu,
        area_util,
        area_total,
        tipo_de_anuncio,
        tipo_de_uso,
      } = req.body;
      const imovel = await ImovelModel.create({
        id_corretor,
        titulo,
        descricao,
        valor,
        iptu,
        area_util,
        area_total,
        tipo_de_anuncio,
        tipo_de_uso,
        createdAt: date,
        updatedAt: date,
      });

      return res.status(201).json(imovel);
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao criar imovel", err: err });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const date = new Date();
      const { id } = req.params;
      const {
        id_corretor,
        titulo,
        descricao,
        valor,
        iptu,
        area_util,
        area_total,
        tipo_de_anuncio,
        tipo_de_uso,
      } = req.body;
      const imovel = await ImovelModel.update(
        {
          id_corretor,
          titulo,
          descricao,
          valor,
          iptu,
          area_util,
          area_total,
          tipo_de_anuncio,
          tipo_de_uso,
          updatedAt: date,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );
      if (!imovel[0]) return res.status(404).json({ message: "Imovel não encontrado" });
      return res.json({ message: "Imovel atualizado com sucesso" });
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao atualizar imovel", err: err });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const imovel = await ImovelModel.destroy({
        where: {
          id: Number(id),
        },
      });
      if (!imovel) return res.status(404).json({ message: "Imovel não encontrado" });
      return res.json({ message: "Imovel deletado com sucesso" });
    } catch (err: any) {
      return res.status(500).json({ message: "Erro ao deletar imovel", err: err });
    }
  }
}
