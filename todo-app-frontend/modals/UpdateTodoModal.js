import { DialogContent, TextField } from "@material-ui/core";
import { useState } from "react";

const UpdateDialog = props => {
  const [update, setUpdate] = useState("");
  return (
    <DialogContent>
      <TextField
        autoFocus
        margin="normal"
        label="Update Todo"
        type="text"
        fullWidth
        name="updateTodo"
        value={update}
        onChange={event => {
          setUpdate(event.target.value);
        }}
      />
    </DialogContent>
  );
};
