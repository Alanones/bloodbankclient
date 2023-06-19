import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { AdminContext } from "../../contexts/admin";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditBank({ open, handleClose, id, bankName, bankAddress }) {
  const { setBankCrud } = React.useContext(AdminContext);
  const [loading, setLoading] = React.useState(false);
  const [bank, setBank] = React.useState({
    id: "",
    name: "",
    address: "",
  });

  React.useEffect(() => {
    if (open) {
      setBank({ id, name: bankName, address: bankAddress });
    }
  }, [open]);
  const submitBank = async () => {
    if (!bank.name || !bank.address) {
      toast("Please enter all data.", { type: "error" });
      return;
    }
    setLoading(true);
    try {
      const res = await customFetch.patch(`/banks/${bank.id}`, { name: bank.name, address: bank.address });
      const data = await res?.data;
      if (data) {
        setBankCrud(true);
        setLoading(false);
        toast("Bank edited successfully", { type: "success" });
      } else {
        setLoading(false);
        toast("Bank not edited", { type: "danger" });
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
            Edit {bank.name}
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

          <FormControl fullWidth sx={{ marginBottom: "15px" }}>
            <Button onClick={submitBank} className="btn" variant="contained">
              {loading ? "Submitting.." : "Add Blood Bank"}
            </Button>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "3px" }}>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
