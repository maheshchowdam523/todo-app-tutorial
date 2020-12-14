import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography
} from "@material-ui/core";
import { useState } from "react";

export const PopUp = props => {
  const [open, isOpen] = useState(props.open);
  return (
    <Dialog open={open} onClose={e => isOpen(false)}>
      <DialogContent>
        <div style={{ minWidth: 380 }}>
          <Typography>{props.message}</Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={e => isOpen(false)} color="primary">
          {props.cancelText}
        </Button>
        <Button onClick={e => isOpen(false)} color="primary">
          {props.saveText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
