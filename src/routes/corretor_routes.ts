import { Router } from "express";
import corretorController from "../controllers/CorretorController";

const userRoutes = Router();

userRoutes.get("/corretor", corretorController.index);
userRoutes.get("/corretor/:id", corretorController.show);

export default userRoutes;
