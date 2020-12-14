import { Button, Container, TextField } from "@material-ui/core";
import { useState } from "react";
import { AddCircleOutlineRounded } from "@material-ui/icons";

export const AddTodo = props => {
  const [input, setInput] = useState("");
  return (
    <Container maxWidth="sm">
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="todo"
          label="Enter ToDo"
          name="todo"
          autoFocus
          value={input}
          onChange={event => {
            setInput(event.target.value);
            props.setTodo(event.target.value);
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={e => {
            props.addTodo(e);
            setInput("");
          }}
          disabled={!input}
        >
          Add Todo <AddCircleOutlineRounded />
        </Button>
      </form>
    </Container>
  );
};
