import express from "express";
import bodyParser from "body-parser";
import { createList, getLists } from "./controllers/ListController";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (_, res) => {
  res.send("To do list App!");
});

app.get("/lists", getLists);
app.post("/lists", createList);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
