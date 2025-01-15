import express from "express";
import cors from "cors";
import "dotenv/config";
import "./database.js";
import { Todo } from "./models/model.js";
const app = express();
const port = process.env.PORT || 3000;
// const todos = [
//   //   { todocontent: "1st todo", id: "1" },
//   //   { todocontent: "2nd todo", id: "2" },
// ];

app.use(express.json()); // request ko jso kaiformat mai convert karnai kailiye
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, Welcome to the Todo API!");
});

app.get("/api/v1/todos", async (req, res) => {
  try {
    console.log("testing");

    const todos = await Todo.find({}).sort({ createdAt: -1 });
    const message = todos.length
      ? "Todos received"
      : "No Todos Available nahi hai";

    res.send({ data: todos, message: message });
  } catch (error) {
    console.log(error);
  }
});

//This api get all todos
app.post("/api/v1/todo", async (req, res) => {
  const obj = {
    todocontent: req.body.todocontent,
    ip: req.ip,
  };
  const result = await Todo.create(obj);
  res.send({ message: "todo-added", data: result });
});

//This api post a todo

app.patch("/api/v1/todo:id", async (req, res) => {
  const id = req.params.id;
  const result = await Todo.findByIdAndUpdate(id, {
    todocontent: req.body.todocontent,
  });

  if (result) {
    res.status(201).send({
      data: { result },
      message: "todo updated",
    });
  } else {
    res.status(200).send({ data: null, message: "todo not found" });
  }
});

//This api edit a todo
app.delete("/api/v1/todo:id", async (req, res) => {
  const id = req.params.id;
  const result = await Todo.findByIdAndDelete(id);

  if (result) {
    res.status(201).send({
      message: "todo deleted",
    });
  } else {
    res.status(200).send({ data: null, message: "todo not found" });
  }
});

//This api delete a todo

app.use((req, res) => {
  res.status(404).send("Sahi Route Dal Bhai");
});
//if any of the route doesnt match this will be called an give 404 error

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
