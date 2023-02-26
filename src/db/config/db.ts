import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize("imoveis-db", "postgres", "1234", {
  host: "127.0.0.1",
  dialect: "postgres",
});
export default sequelize;
