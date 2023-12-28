import express, { Request, Response } from "express";
import getContacts from "./middleWares/getContacts";
import getExperience from "./middleWares/getExperience";
import getPortfolio from "./middleWares/getPortfolio";

const app = express();
const port = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello,world!");
});

app.get("/getContacts", getContacts);
app.get("/getExperience", getExperience);
app.get("/getPortfolio", getPortfolio);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
