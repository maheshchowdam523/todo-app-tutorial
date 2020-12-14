import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField
} from "@material-ui/core";
import { useState } from "react";

export const DialogPopUp = props => {
  const [update, setUpdate] = useState("");
  const updateAction = (e, todo) => {
    props.editTodo(e, todo._id, todo);
  };
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogContent style={{ width: 700 }}>
        <TextField
          autoFocus
          margin="normal"
          label="Update Todo"
          type="text"
          width={500}
          fullWidth
          name="updateTodo"
          value={update}
          onChange={event => {
            setUpdate(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={async e => {
            updateAction(e, { ...props.todo, name: update });
            props.handleClose();
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
