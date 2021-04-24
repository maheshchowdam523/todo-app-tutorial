import {
    Button, Checkbox,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import {DeleteOutlineRounded, Done, Edit} from "@material-ui/icons";
import React from "react";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: "#fafafa"
    },
    gridList: {
        height: 350,
        width: '97%',
        borderRadius: 20,
        backgroundColor: "white",
        overflowY: "scroll"
    },
    icon: {
        color: "rgba(255, 255, 255, 0.54)"
    },
    strike: {
        textDecoration: "line-through"
    },
    listItemText: {
        fontSize: 24,
        color: "#5285EC"
    },
    submit: {
        width: '90%',
        height: 50,
        color: "#fff",
        backgroundColor: "#5285Ec"
    },
    input: {
        height: 50,
        width: 246
    }
}));

export const TodoItem = props => {
    const classes = useStyles();
    const updateAction = (e, todo) => {
        props.updateTodo(e, todo._id, todo);
    };
    const {todos, openUpdateDialog, setTodo, deleteTodo, filterTasks} = props;

    return (
        <div>
            <div style={{display: "flex"}}>
                <div><Typography variant="h4" align="left" display="inline" style={{marginLeft: 24}}>Tasks</Typography>
                </div>
                <div style={{marginLeft: "auto", display: "flex", paddingBottom: 20}}>
                    <div style={{marginRight: 20, width: 400}}>
                        <TextField
                            id="outlined-search"
                            label="Search task by name"
                            type="search"
                            variant="outlined"
                            InputProps={{
                                className: classes.input
                            }}
                            onChange={e => filterTasks(e.target.value)}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        startIcon={<AddIcon />}
                        onClick={() => {
                            openUpdateDialog({name: ''});
                            setTodo({name: ''});
                        }}
                        style={{marginRight: 20}}
                    >
                        New Task
                    </Button>
                </div>
            </div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                <List dense={true} className={classes.gridList}>
                    {todos.length > 0 ? todos.map(todo => (
                        <>
                            <ListItem key={todo._id}>
                                <Checkbox ripple={false} checked={todo.completed} color="default"/>
                                <ListItemText
                                    primary={todo.name}
                                    classes={{primary: classes.listItemText}}
                                    className={todo.completed && classes.strike}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="Done"
                                        color={todo.completed ? "#5285Ec" : "default"}
                                        disabled={todo.completed}
                                        onClick={e => updateAction(e, {...todo, completed: true})}
                                    >
                                        <Done/>
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="Edit"
                                        color={"#5285Ec"}
                                        disabled={todo.completed}
                                        onClick={() => {
                                            openUpdateDialog(todo);
                                            setTodo(todo);
                                        }}
                                    >
                                        <Edit/>
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        color={"#5285Ec"}
                                        onClick={e => deleteTodo(e, todo._id)}
                                    >
                                        <DeleteOutlineRounded/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider variant="fullWidth" component="li"/>
                        </>
                    )): <p style={{textAlign: 'center'}}>No Todos Yet :(</p> }
                </List>
            </Grid>
        </div>
    );
};
