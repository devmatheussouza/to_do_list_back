import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import * as ListController from "./controllers/ListController";
import * as ToDoController from "./controllers/ToDoController";
import { ObjectId } from "bson";

const app = express();
const port: any = process.env.PORT;
const id = new ObjectId();
dotenv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (_, res) => {
  res.send("To do list App!");
});

// List endpoints
app.get("/lists", ListController.getLists);
app.post("/lists", ListController.createList);
app.put("/lists/:listId", ListController.updateListName);
app.delete("/lists/:listId", ListController.deleteListById);

// To Do endpoints
app.get("/todos", ToDoController.getToDos);
app.get("/todosById", ToDoController.getToDosByListId);
app.post("/todos", ToDoController.createToDo);
app.put("/todos", ToDoController.updateToDo);
app.delete("/todos", ToDoController.deleteToDo);

app.listen(port, "0.0.0.0", () => {
  console.log(`App running at http://localhost:${port}`);
});
