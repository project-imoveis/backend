import { Router } from "express";
import PropertyController from "../controllers/PropertyController";

const propertiesRoutes = Router();

propertiesRoutes.get("/properties", PropertyController.getAll);
propertiesRoutes.get("/properties/:id", PropertyController.getById);
propertiesRoutes.post("/properties", PropertyController.create);
propertiesRoutes.put("/properties/:id", PropertyController.update);
propertiesRoutes.delete("/properties/:id", PropertyController.delete);

export default propertiesRoutes;
