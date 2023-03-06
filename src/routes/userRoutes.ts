import { Router } from "express";
import UserController from "../controllers/UserController";
const userRoutes = Router();
userRoutes.get("/users", UserController.getAll);
userRoutes.get("/users/:id", UserController.getById);
userRoutes.get("/users/:id/properties", UserController.getByIdWithProperties);
userRoutes.post("/users/register", UserController.register);
userRoutes.post("/users/login", UserController.login);
userRoutes.put("/users/:id", UserController.update);
userRoutes.put("/restore/:id", UserController.restoreById);
userRoutes.delete("/users/:id", UserController.delete);

export default userRoutes;
