import React, {useEffect, useState} from "react";
import "./App.css";
import {TodoItem} from "./todoList";
import {DialogPopUp} from "./DialogBox";
import {Avatar, Button, makeStyles} from "@material-ui/core";
import {ApiHelper} from "./ApiHelper";
import LoginPage from "./app/LoginPage";
import Dashboard from "./app/Dashboard";
import EmptyTodo from "./app/emptyTodo";
import AvatarIcon from "./images.png"

const useStyles = makeStyles(theme => ({
    heading: {
        backgroundColor: "#fff",
        display: "flex",
        padding: "0px 20px 0px 20px",
        color: "white"
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
    }, headerText: {
        fontSize: 16, fontWeight: 600, color: "#7a7d7e"
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
    const [dashboardData, updateDashboardData] = useState(undefined);

    const fetchTodoAndSetTodos = async () => {
        const data = await ApiHelper.getDashboardData();
        updateDashboardData(data)
        let todos = [];
        if (data.totalCount > 0) {
            todos = await ApiHelper.getAllTodos();
        }
        setTodos(todos);
    };

    useEffect(() => {
        fetchTodoAndSetTodos();
    }, []);

    const deleteTodo = async (e, id) => {
        try {
            e.stopPropagation();
            await ApiHelper.deleteTodo(id);
            await fetchTodoAndSetTodos();
        } catch (err) {
        }
    };

    const updateTodo = async (e, id, todo) => {
        e.stopPropagation();
        if (id) {
            const payload = {
                completed: todo.completed,
                name: todo.name
            };
            await ApiHelper.updateTodo(id, payload);
        } else {
            await ApiHelper.createTodo(todo.name);
        }
        await fetchTodoAndSetTodos();
    };

    const validateUser = async (username, password) => {
        const payload = {username: username, password: password};
        const response = await ApiHelper.validateUser(payload);
        if (response.status === 200) {
            updateUser(response.data.name);
            updateError("");
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

    const filterTasks = async (name) => {
        console.log("name", name);
        const updatedTasks = todos.filter(t => t.name.includes(name));
        setTodos(name ? updatedTasks : await ApiHelper.getAllTodos());
    }

    return (
        <div>
            <div className={classes.heading}>
                { user &&  <Avatar alt="Admin" src={AvatarIcon} /> }
                <p className={classes.headerText}>{user ? user : 'Task App'}</p>
                {user && (
                    <Button
                        type={"reset"}
                        variant="text"
                        className={classes.headerText}
                        style={{marginLeft: "auto"}}
                        onClick={e => {
                            updateUser(false);
                            updateError("");
                        }}
                    >
                        Sign out
                    </Button>
                )}
            </div>
            {!user ? (
                <LoginPage
                    updateUser={updateUser}
                    validateUser={validateUser}
                    errorMessage={error}
                />
            ) : (
                <div>
                    {dashboardData && dashboardData.totalCount > 0 ? <>
                            <Dashboard data={dashboardData}/>
                            <TodoItem
                                todos={todos}
                                deleteTodo={deleteTodo}
                                updateTodo={updateTodo}
                                openUpdateDialog={openUpdateDialog}
                                setTodo={setTodo}
                                filterTasks={filterTasks}
                            /> </> :
                        <EmptyTodo updateTodo={updateTodo} setTodo={setTodo}
                                   openUpdateDialog={openUpdateDialog}/>}

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
