import { Sequelize } from "@sequelize/core";
import * as dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_DATABASE || "",
  process.env.DB_USERNAME || "",
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);
export default sequelize;
