import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CancelIcon from "@mui/icons-material/Cancel";
import Typography from "@mui/material/Typography";
import UnitsList from "../components/ListUnits";
import { Tooltip } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "100%",
  width: "70%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  overflow: "scroll",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({ open, handleClose, setOpen, name }) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography style={{ marginBottom: "15px" }} id="transition-modal-title" variant="h6" component="h2">
              {name}
              <Tooltip title="close">
                <CancelIcon
                  fontSize="large"
                  sx={{ position: "absolute", right: "30px", cursor: "pointer" }}
                  onClick={handleClose}
                />
              </Tooltip>
            </Typography>
            {/* Table with list units */}
            <UnitsList />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
