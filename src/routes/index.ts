import express, { Request, Response, Express } from "express";
import corretorRoutes from "./corretor_routes";

const routes = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello worlds!");
  });

  app.use(express.json(), corretorRoutes);
};

export default routes;
