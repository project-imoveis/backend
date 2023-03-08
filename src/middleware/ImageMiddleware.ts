import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
dotenv.config();

const stoaragesTypes = {
  local: multer.diskStorage({
    destination: (req, file, callback) => {
      const { type = "profile" } = req.params;

      callback(null, `./src/public/upload/${type}`);
    },
    filename: (req, file: any, callback) => {
      crypto.randomBytes(12, (err, hash) => {
        if (err) callback(new Error("Invalid file type"), "invalid");
        file.key = `${hash.toString("hex")}_${file.originalname}`;
        callback(null, file.key);
      });
    },
  }),
  s3: multerS3({
    s3: new S3Client({
      region: process.env.AWS_DEFAULT_REGION,
    }),
    bucket: "imoveis-upload",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, callback) => {
      crypto.randomBytes(12, (err, hash) => {
        if (err) callback(new Error("Invalid file type"), "invalid");
        const filename = `${hash.toString("hex")}_${file.originalname}`;

        callback(null, filename);
      });
    },
  }),
};
const upload = multer({
  storage: (stoaragesTypes as any)[process.env.MULTER_STORAGE || "local"],
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
  fileFilter: (req: any, file: any, callback) => {
    const allowedMimetype = ["image/png", "image/jpeg", "image/pjpeg", "image/gif"];
    const allowedExt = ["png", "jpg", "jpeg", "gif"];
    const acceptedMIme = allowedMimetype.includes(file.mimetype);
    const acceptedExt = allowedExt.includes(file.originalname.split(".").pop());
    if (acceptedMIme && acceptedExt) {
      return callback(null, true);
    }
    return callback(new Error("Invalid file type"));
  },
}).single("image");

export function ImageMiddleware(req: Request, res: Response, next: NextFunction) {
  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err, type: "Multer" });
    } else if (err) {
      return res.status(400).json({ message: err, type: "other" });
    }
    next();
  });
}
