import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { AdminContext } from "../../../contexts/admin";
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

export default function AddBlood({ open, handleClose }) {
  const { allBanks } = React.useContext(AdminContext);
  const [loading, setLoading] = React.useState(false);
  const [blood, setBlood] = React.useState({
    bloodType: "",
    quantity: "",
    expiry: dayjs(new Date()),
    bank: "",
  });

  const submitBlood = async () => {
    if (!blood.bloodType || !blood.quantity || !blood.expiry || !blood.bank) {
      toast("Please enter all data.", { type: "error" });
      return;
    }
    setLoading(true);
    try {
      const res = await customFetch.post("/bloods", blood);
      if (res?.data) {
        setLoading(false);
        toast("Blood added successfully", { type: "success" });
      } else {
        setLoading(false);
        toast("Blood not added", { type: "danger" });
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
            Add new blood{" "}
            <span style={{ position: "relative", left: "150px", cursor: "pointer" }}>
              <CloseIcon onClick={handleClose} />
            </span>
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: "15px" }}>
            <InputLabel id="demo-simple-select-label">Blood type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={blood.type}
              label="Blood Type"
              onChange={(e) => {
                setBlood((prev) => {
                  return { ...prev, bloodType: e.target.value };
                });
              }}
            >
              <MenuItem value={"O-"}>O-</MenuItem>
              <MenuItem value={"O+"}>O+</MenuItem>
              <MenuItem value={"A-"}>A-</MenuItem>
              <MenuItem value={"A+"}>A+</MenuItem>
              <MenuItem value={"B-"}>B-</MenuItem>
              <MenuItem value={"B+"}>B+</MenuItem>
              <MenuItem value={"AB-"}>AB-</MenuItem>
              <MenuItem value={"AB+"}>AB+</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: "15px" }}>
            <InputLabel id="bank-select-label">Blood Bank</InputLabel>
            <Select
              labelId="bank-select-label"
              id="bank-select"
              value={blood.bank}
              label="Blood Bank"
              onChange={(e) => {
                setBlood((prev) => {
                  return { ...prev, bank: e.target.value };
                });
              }}
            >
              {allBanks?.map((bank, index) => {
                return (
                  <MenuItem value={bank?._id} key={index}>
                    {bank?.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "15px" }}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
              <DateTimePicker
                label="Expiry date"
                value={blood.expiry}
                format="YYYY-MM-DD"
                onChange={(newValue) => {
                  setBlood((prev) => {
                    return { ...prev, expiry: newValue };
                  });
                }}
              />
            </DemoContainer>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "15px" }}>
            <TextField
              id="outlined-controlled"
              label="Quanity"
              value={blood.quantity}
              onChange={(e) => {
                setBlood((prev) => {
                  return { ...prev, quantity: Number(e.target.value) };
                });
              }}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: "3px" }}>
            <Button onClick={submitBlood} className="btn">
              {loading ? "Submitting.." : "Add Blood Unit"}
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
