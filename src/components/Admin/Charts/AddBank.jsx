import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import customFetch from "../../../utils/axios";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddBank({ open, handleClose }) {
  const [loading, setLoading] = React.useState(false);
  const [bank, setBank] = React.useState({
    name: "",
    address: "",
  });

  const submitBank = async () => {
    if (!bank.name || !bank.address) {
      toast("Please enter all data.", { type: "error" });
      return;
    }
    setLoading(true);
    try {
      const res = await customFetch.post("/banks", bank);
      if (res?.data) {
        setLoading(false);
        toast("Bank added successfully", { type: "success" });
      } else {
        setLoading(false);
        toast("Bank not added", { type: "danger" });
      }
      handleClose();
    } catch (error) {
      setLoading(false);
      toast("Something went wrong", { type: "error" });
      console.log(error);
      handleClose();
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new blood bank{" "}
            <span style={{ position: "relative", left: "120px", cursor: "pointer" }}>
              <CloseIcon onClick={handleClose} />
            </span>
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: "15px" }}>
            <TextField
              id="outlined-controlled"
              label="Name"
              value={bank.name}
              onChange={(e) => {
                setBank((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "15px" }}>
            <TextField
              id="outlined-controlled"
              label="Address"
              value={bank.address}
              onChange={(e) => {
                setBank((prev) => {
                  return { ...prev, address: e.target.value };
                });
              }}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: "3px" }}>
            <Button onClick={submitBank} className="btn">
              {loading ? "Submitting.." : "Add Blood Bank"}
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
