const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*"
  })
);

const port = 3001;

const gameQuery = require("./gameQuery");

app.get("/", async (req, res) => res.json(await gameQuery.query()));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
