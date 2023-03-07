import { Router } from "express";
import ImageController from "../controllers/ImageController";
import { ImageMiddleware } from "../middleware/ImageMiddleware";

const ImageRoutes = Router();

ImageRoutes.post("/images/:type/upload", ImageMiddleware, ImageController.uploadPhotos);
ImageRoutes.put(
  "/images/updateprofile/:user_id",
  ImageMiddleware,
  ImageController.updateProfilePhoto
);
ImageRoutes.delete("/images/delete/:key", ImageController.deletePhoto);

export default ImageRoutes;
