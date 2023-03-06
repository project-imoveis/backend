import { Router } from "express";
import ImageController from "../controllers/ImageController";
import { ImageMiddleware } from "../middleware/ImageMiddleware";
const ImageRoutes = Router();

ImageRoutes.get("/images/:type/:filename", ImageController.getPhoto);
ImageRoutes.post("/images/:type/upload", ImageMiddleware, ImageController.uploadPhotos);
ImageRoutes.delete("/images/delete/:key", ImageController.deletePhoto);

export default ImageRoutes;
