import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Login";
import { TodoItem } from "./todoList";
import { AddTodo } from "./AddTodo";
import { DialogPopUp } from "./DialogBox";
import { makeStyles } from "@material-ui/core";
import { ApiHelper } from "./ApiHelper";

const useStyles = makeStyles(theme => ({
  heading: {
    backgroundColor: "green",
    minHeight: "10vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "white",
    paddingLeft: 20
  },
  gridList: {
    height: 450,
    width: 500
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  root: {
    textAlign: "center"
  }
}));

function App() {
  const classes = useStyles();
  const [user, updateUser] = useState(undefined);
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [error, updateError] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState("");

  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await ApiHelper.getAllTodos();
      setTodos(todos);
    };
    fetchTodoAndSetTodos();
  }, []);

  const createTodo = async e => {
    e.preventDefault();
    if (!todo) {
      alert("please enter something");
      return;
    }
    if (todos.some(({ name }) => name === todo)) {
      alert(`Task: ${todo} already exists`);
      return;
    }
    const newTodo = await ApiHelper.createTodo(todo);
    setTodo("");
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (e, id) => {
    try {
      e.stopPropagation();
      await ApiHelper.deleteTodo(id);
      setTodos(todos.filter(({ _id: i }) => id !== i));
    } catch (err) {}
  };

  const updateTodo = async (e, id, todo) => {
    e.stopPropagation();
    const payload = {
      completed: todo.completed,
      name: todo.name
    };
    const updatedTodo = await ApiHelper.updateTodo(id, payload);
    setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
  };

  const validateUser = async (username, password) => {
    const payload = { username: username.value, password: password.value };
    const response = await ApiHelper.validateUser(payload);
    if (response.status === 200) {
      updateUser(response.data.name);
    } else {
      updateUser(undefined);
      console.log("error", response);
      updateError(response.data.message);
    }
  };

  const openUpdateDialog = todo => {
    setOpen(true);
    setUpdate(todo.name);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <h2 className={classes.heading}> Heading </h2>
      {!user ? (
        <Login
          updateUser={updateUser}
          validateUser={validateUser}
          errorMessage={error}
        />
      ) : (
        <div>
          <AddTodo setTodo={setTodo} addTodo={createTodo} />
          {todos.length ? (
            <TodoItem
              todos={todos}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
              openUpdateDialog={openUpdateDialog}
              setTodo={setTodo}
            />
          ) : (
            <p className={classes.root}>No Todos Yet :(</p>
          )}
        </div>
      )}
      <DialogPopUp
        update={update}
        todo={todo}
        handleClose={handleClose}
        updateTodo={setTodo}
        editTodo={updateTodo}
        open={open}
      />
    </div>
  );
}

export default App;
