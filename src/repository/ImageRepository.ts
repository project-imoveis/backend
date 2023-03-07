import Models from "../models";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config();

export class ImageRepository {
  static async uploadPhoto(type: any, body: any, file: any) {
    const { user_id, property_id } = body;
    const { originalname: name, size, key, location: url } = file;
    const isLocal = process.env.MULTER_STORAGE == "local";
    let localUrl = "";
    if (isLocal && !url) {
      localUrl = `http://localhost:${process.env.PORT}/upload/${type}/${key}`;
    }
    const fileCreated = await Models.Image.create({
      user_id,
      property_id,
      name,
      size,
      type,
      key,
      url: isLocal ? localUrl : url,
    });

    return fileCreated;
  }
  static async changeProfilePhoto(user_id: any, file: any) {
    const photo = await Models.Image.findOne({
      where: {
        user_id,
      },
    });
    if (photo) {
      await this.deletePhoto(photo.getDataValue("key"));
    }
    return await this.uploadPhoto("profile", { user_id }, file);
  }
  static async deletePhoto(key: any) {
    const client = new S3Client({
      region: "sa-east-1",
    });
    const image = await Models.Image.findOne({
      where: {
        key,
      },
    });

    if (!image) {
      throw new Error("Imagem não encontrada");
    }

    await Models.Image.destroy({
      where: {
        key,
      },
    });

    if (process.env.MULTER_STORAGE == "s3") {
      await client.send(new DeleteObjectCommand({ Bucket: "imoveis-upload", Key: key }));
    } else {
      fs.unlinkSync(
        path.resolve(__dirname, "..", "public", "upload", image.getDataValue("type"), key)
      );
    }
  }
}
