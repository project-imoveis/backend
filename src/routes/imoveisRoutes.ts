import { Router } from "express";
import imoveisController from "../controllers/ImoveisController";

const imoveisRoutes = Router();

imoveisRoutes.get("/imoveis", imoveisController.getAll);
imoveisRoutes.get("/imoveis/:id", imoveisController.getById);
imoveisRoutes.post("/imoveis", imoveisController.create);
imoveisRoutes.put("/imoveis/:id", imoveisController.update);
imoveisRoutes.delete("/imoveis/:id", imoveisController.delete);

export default imoveisRoutes;
