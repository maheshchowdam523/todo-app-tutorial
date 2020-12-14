import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import { DeleteOutlineRounded, Edit, Done } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    height: 450,
    width: 500
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  strike: {
    textDecoration: "line-through"
  }
}));

export const TodoItem = props => {
  const classes = useStyles();
  const updateAction = (e, todo) => {
    props.updateTodo(e, todo._id, todo);
  };
  return (
    <div className={classes.root}>
      <List dense={true} className={classes.gridList}>
        {props.todos.map(todo => (
          <ListItem key={todo._id}>
            <ListItemText
              primary={todo.name}
              className={todo.completed && classes.strike}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="Done"
                color={todo.completed ? "primary" : "default"}
                disabled={todo.completed}
                onClick={e => {
                  // props.openUpdateDialog(todo);
                  updateAction(e, { ...todo, completed: true });
                }}
              >
                <Done />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="Edit"
                color={"primary"}
                disabled={todo.completed}
                onClick={() => {
                  props.openUpdateDialog(todo);
                  props.setTodo(todo);
                }}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                color={"primary"}
                onClick={e => props.deleteTodo(e, todo._id)}
              >
                <DeleteOutlineRounded />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
