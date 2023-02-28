import { Router } from "express";
import usuarioController from "../controllers/UsuarioController";

const usuarioRoutes = Router();
usuarioRoutes.get("/usuarios", usuarioController.getAll);
usuarioRoutes.get("/usuarios/:id", usuarioController.getById);
usuarioRoutes.post("/usuarios", usuarioController.create);
usuarioRoutes.put("/usuarios/:id", usuarioController.update);
usuarioRoutes.delete("/usuarios/:id", usuarioController.delete);
usuarioRoutes.put("/restore/:id", usuarioController.restoreById);

export default usuarioRoutes;
