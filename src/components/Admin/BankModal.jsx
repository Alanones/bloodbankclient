import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CancelIcon from "@mui/icons-material/Cancel";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";
import { useContext } from "react";
import { ClientContext } from "../../contexts/client";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BankModal({ open, handleClose, data }) {
  const { setOpenBankModal } = useContext(ClientContext);

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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {data.title}
              <Tooltip title="close">
                <CancelIcon
                  fontSize="large"
                  sx={{ marginLeft: "530px", cursor: "pointer" }}
                  onClick={() => {
                    setOpenBankModal(false);
                  }}
                />
              </Tooltip>
            </Typography>
            {/* Table with list units */}
            <h3>All elements</h3>
            {/* End of table */}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
