import express, { Response, Express } from "express";
import userRoutes from "./userRoutes";
import propertyRoutes from "./propertyRoutes";
import cors from "cors";

const routes = (app: Express) => {
  app.use(cors());

  app.get("/", (_: any, res: Response) => {
    res.status(200).send("Hello worlds!");
  });

  app.use(express.json(), userRoutes);
  app.use(express.json(), propertyRoutes);
};

export default routes;
