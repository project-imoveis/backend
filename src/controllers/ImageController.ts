import { Request, Response } from "express";
import { ImageRepository } from "../repository/ImageRepository";

export default class ImageController {
  static async uploadPhotos(req: Request, res: Response) {
    try {
      const { type } = req.params;
      const body = req.body;
      const file = req.file;
      const fileCreated = await ImageRepository.uploadPhoto(type, body, file);
      return res.status(200).json(fileCreated);
    } catch (err: any) {
      return res.status(400).json({ message: "Não foi possível salvar  imagem", err: err });
    }
  }
  static async updateProfilePhoto(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const file = req.file;
      const fileUpdated = await ImageRepository.changeProfilePhoto(user_id, file);
      return res.status(200).json(fileUpdated);
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Não foi possível atualizar foto de perfil", err: err });
    }
  }
  static async deletePhoto(req: Request, res: Response) {
    try {
      const { key } = req.params;
      const fileDeleted = await ImageRepository.deletePhoto(key);
      return res.status(200).json(fileDeleted);
    } catch (err: any) {
      return res.status(400).json({ message: "Não foi possível deletar imagem", err: err });
    }
  }
}
