import {response} from "./utils";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const db = require("./models/");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(cors());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/todos", async (req, res, next) => {
  try {
    const todos = await db.Todo.find({});
    return response(res, 200, todos);
  } catch (err) {
    next({ status: 400, message: "failed to get todos" });
  }
});

app.post("/addTodo", async (req, res, next) => {
  try {
    const todo = await db.Todo.create(req.body);
    return response(res, 201, todo);
  } catch (err) {
    next({ status: 400, message: "failed to create todo" });
  }
});

app.put("/todos/:id", async (req, res, next) => {
  try {
    const todo = await db.Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return response(res, 200, todo);
  } catch (err) {
    next({ status: 400, message: "failed to update todo" });
  }
});
app.delete("/todos/:id", async (req, res, next) => {
  try {
    await db.Todo.findByIdAndRemove(req.params.id);
    return response(res, 200, "todo deleted!");
  } catch (err) {
    next({ status: 400, message: "failed to delete todo" });
  }
});

app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request"
  });
});

// TODO: Need to create separate controller
// User Routes
app.post("/createUser", async (req, res, next) => {
  try {
    const todo = await db.User.create(req.body);
    return response(res, 200, todo);
  } catch (err) {
    next({ status: 400, message: "failed to create user" });
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const todo = await db.User.findOne({username: req.body.username, password: req.body.password});
    if (todo) {
      return response(res, 200, todo);
    } else {
      return response(res, 400, {message: 'Bad Credentials'});
    }
  } catch (err) {
    next({ status: 400, message: "Bad Credentials" });
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});