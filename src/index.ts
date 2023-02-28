import express from "express";
import sequelize from "./db/config/db";
import routes from "./routes";
const port = process.env.PORT || 8000;

const app = express();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
routes(app);
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
export default app;
