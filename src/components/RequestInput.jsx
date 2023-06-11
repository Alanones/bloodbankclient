import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ClientContext } from "../contexts/client";
import { toast } from "react-toastify";
import customFetch from "../utils/axios";

const RequestInput = ({ open, handleClose }) => {
  const { requestUnits, setRequestUnits, setUnitsOpen } = React.useContext(ClientContext);
  const [value, setValue] = React.useState(0);

  const sendRequest = async () => {
    const { blood, bank, date } = requestUnits;
    setRequestUnits((prev) => {
      return { ...prev, quantity: value };
    });
    if (value < 1) {
      toast("Requested units must be at least one (1) unit", { type: "error" });
      return;
    }
    try {
      const res = await customFetch.post("/requests", { blood, bank, date, quantity: value });
      const req = await res?.data;
      if (req) {
        toast("Request sent successfully", { type: "success" });
        console.log(req);
        setRequestUnits(false);
        setUnitsOpen(false);
      }
    } catch (error) {
      console.log(error);
      setRequestUnits(false);
      setUnitsOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Request blood units</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the number of units needed</DialogContentText>
          <TextField
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            autoFocus
            margin="none"
            id="name"
            label="Blood uits"
            type="number"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              sendRequest();
              setUnitsOpen(false);
              handleClose();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default RequestInput;
