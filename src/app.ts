import express from "express";
import bodyParser from "body-parser";
import {
  createList,
  deleteListById,
  getLists,
  updateListName,
} from "./controllers/ListController";
import {
  createToDo,
  getToDos,
  getToDosByListId,
} from "./controllers/ToDoController";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (_, res) => {
  res.send("To do list App!");
});

// List endpoints
app.get("/lists", getLists);
app.post("/lists", createList);
app.put("/lists/:listId", updateListName);
app.delete("/lists/:listId", deleteListById);

// To Do endpoints
app.get("/todos", getToDos);
app.get("/todos/:listId", getToDosByListId);
app.post("/todos", createToDo);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
