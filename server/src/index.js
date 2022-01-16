const express = require("express");
const cors = require("cors");
const app = express();

const Sentry = require("@sentry/node");
Sentry.init({
  dsn: `https://${process.env.sentryKey}@sentry.io/${process.env.sentryProject}`,
});

app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT || 3001;

const gameQuery = require("./gameQuery");

app.get("/", async (req, res) => res.json(await gameQuery.query()));
app.get("/v2", async (req, res) => res.json(await gameQuery.queryV2()));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
