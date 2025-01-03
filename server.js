import express from "express";
const app = express();
const port = process.env.PORT || 3000;
const todos = [
  //   { todocontent: "1st todo", id: "1" },
  //   { todocontent: "2nd todo", id: "2" },
];

app.use(express.json()); // request ko jso kaiformat mai convert karnai kailiye

app.get("/get-all-todo", (req, res) => {
  const message = todos.length ? "Todos received" : "No Todos Available";
  res.send({ data: todos, message: message });
});

//This api get all todos
app.post("/post-todo", (req, res) => {
  const obj = {
    todocontent: req.body.todocontent,
    id: String(new Date().getTime()),
  };
  todos.push(obj);
  res.send({ message: "todo-added", data: obj });
});

//This api post a todo

app.patch("/edit-todo:id", (req, res) => {
  const id = req.params.id;
  let isFound = false;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      todos[i].todocontent = req.body.todocontent;
      isFound = true;
      break;
    }
  }
  if (isFound) {
    res.status(201).send({
      data: { todocontent: req.body.todocontent, id: id },
      message: "todo updated",
    });
  } else {
    res.status(200).send({ data: null, message: "todo not found" });
  }
});

//This api edit a todo
app.delete("/delete-todo:id", (req, res) => {
  const id = req.params.id;
  let isFound = false;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      todos.splice(i, 1);
      isFound = true;
      break;
    }
  }
  if (isFound) {
    res.status(201).send({
      message: "todo deleted",
    });
  } else {
    res.status(200).send({ data: null, message: "todo not found" });
  }
});

//This api delete a todo

app.use((req, res) => {
  res.status(404).send("No Route Found");
});
//if any of the route doesnt match this will be called an give 404 error

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
