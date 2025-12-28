import express from "express";
import type { Request, Response } from "express";
import process from "node:process";
import getContacts from "./middleWares/getContacts.ts";
import getExperience from "./middleWares/getExperience.ts";
import getPortfolio from "./middleWares/getPortfolio.ts";
import console from "node:console";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello,world!");
});

app.get("/getContacts", getContacts);
app.get("/getExperience", getExperience);
app.get("/getPortfolio", getPortfolio);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
