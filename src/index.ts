const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get("/", (_: any, res: any) => {
  res.send("Hello World!");
});

export default app;
