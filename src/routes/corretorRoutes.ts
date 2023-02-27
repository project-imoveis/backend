import { Router } from "express";
import corretorController from "../controllers/CorretorController";

const corretorRoutes = Router();
corretorRoutes.get("/corretores", corretorController.getAll);
corretorRoutes.get("/corretores/:id", corretorController.getById);
corretorRoutes.post("/corretores", corretorController.create);
corretorRoutes.put("/corretores/:id", corretorController.update);
corretorRoutes.delete("/corretores/:id", corretorController.delete);

export default corretorRoutes;
