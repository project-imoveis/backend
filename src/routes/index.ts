import express, { Response, Express } from "express";
import usuarioRoutes from "./usuarioRoutes";
import imovelRoutes from "./imoveisRoutes";
import cors from "cors";

const routes = (app: Express) => {
  app.use(cors());

  app.get("/", (_: any, res: Response) => {
    res.status(200).send("Hello worlds!");
  });

  app.use(express.json(), usuarioRoutes);
  app.use(express.json(), imovelRoutes);
};

export default routes;
