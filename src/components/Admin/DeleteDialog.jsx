import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ name, loading, open, handleClose, deleteUser, item }) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete User Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {loading ? `Attempting to delete ${name}` : `Are you sure you want to delete ${name}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteUser} disable={loading}>
            Delete {item}
          </Button>
          <Button onClick={handleClose} disable={loading}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
