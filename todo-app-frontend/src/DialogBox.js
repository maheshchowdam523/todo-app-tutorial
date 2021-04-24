import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    TextField, Typography
} from "@material-ui/core";
import React, {useEffect, useState} from "react";

export const DialogPopUp = props => {
  const [update, setUpdate] = useState("");
  const updateAction = (e, todo) => {
    props.editTodo(e, todo._id, todo);
  };
  useEffect(() => {
      setUpdate(update);
  }, [update]);
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogContent style={{ width: 500, textAlign: 'center' }}>
          <Typography variant="h4" align="left" display="inline">{props?.todo?._id ? 'Update Task': 'Add a New Task'}</Typography>
        <TextField
          autoFocus
          margin="normal"
          label="Add / Update Task"
          type="text"
          fullWidth
          name="updateTodo"
          value={update}
          onChange={event => {
            setUpdate(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button
          onClick={async e => {
            updateAction(e, { ...props.todo, name: update });
            props.handleClose();
            setUpdate("");
          }}
          color="default"
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
