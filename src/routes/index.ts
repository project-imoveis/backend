import express, { Response, Express } from "express";
import userRoutes from "./userRoutes";
import propertyRoutes from "./propertyRoutes";
import cors from "cors";
import ImageRoutes from "./ImageRoutes";

const routes = (app: Express) => {
  app.use(cors());

  app.get("/", (_: any, res: Response) => {
    res.status(200).send("Hello worlds!");
  });

  app.use(express.json(), userRoutes);
  app.use(express.json(), propertyRoutes);
  app.use(express.json(), ImageRoutes);
};

export default routes;
