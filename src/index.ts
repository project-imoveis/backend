import express from "express";
import db from "./db/config/db";
import routes from "./routes";
import { urlencoded } from "body-parser";
import * as dotenv from "dotenv";
import path from "path";
const port = process.env.PORT || 8000;

const app = express();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(urlencoded({ limit: "1mb", extended: true }));
dotenv.config();
routes(app);
// static files from public/upload
console.log(path.resolve(__dirname, "public", "upload"));
app.use("/upload/profile", express.static(path.resolve(__dirname, "public", "upload", "profile")));
app.use(
  "/upload/property",
  express.static(path.resolve(__dirname, "public", "upload", "property"))
);

(async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
export default app;
