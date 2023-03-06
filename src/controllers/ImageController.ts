import { Request, Response } from "express";
import path from "path";
import { ImageRepository } from "../repository/ImageRepository";

export default class ImageController {
  static async getPhoto(req: Request, res: Response) {
    const { filename, type } = req.params;
    return res.sendFile(
      path.resolve(path.resolve(__dirname, `${__dirname}/../public/upload/${type}/${filename}`))
    );
  }
  static async uploadPhotos(req: Request, res: Response) {
    try {
      const { type } = req.params;
      const body = req.body;
      const file = req.file;
      const fileCreated = await ImageRepository.uploadPhoto(type, body, file);
      return res.status(200).json(fileCreated);
    } catch (err: any) {
      return res.status(500).json({ message: "Não foi possível salvar  imagem", err: err });
    }
  }
  static async deletePhoto(req: Request, res: Response) {
    try {
      const { key } = req.params;
      const fileDeleted = await ImageRepository.deletePhoto(key);
      return res.status(200).json(fileDeleted);
    } catch (err: any) {
      return res.status(500).json({ message: "Não foi possível deletar imagem", err: err });
    }
  }
}
