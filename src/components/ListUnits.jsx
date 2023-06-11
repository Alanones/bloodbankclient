import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { ClientContext } from "../contexts/client";
import RequestInput from "./RequestInput";
import { Skeleton, Typography } from "@mui/material";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(type, quantity, expiry) {
  return { type, quantity, expiry };
}

// const rows = [
//   createData("A+", 159, "2023-10-31"),
//   createData("A-", 237, "2023-10-31"),
//   createData("AB", 262, "2023-10-31"),
//   createData("O", 305, "2023-10-31"),
//   createData("B", 356, "2023-10-31"),
// ];

export default function ListUnits() {
  const { openRequestModal, setOpenRequestModal, units, loadingUnits, setRequestUnits } =
    React.useContext(ClientContext);

  const rows = units?.map((unit) => {
    return createData(unit.bloodType, unit.quantity, moment(unit.expiry, "YYYYMMDD").fromNow());
  });
  const handleClose = () => {
    setOpenRequestModal(false);
  };

  if (loadingUnits) {
    return <Skeleton variant="rectangular" width={410} height={118} />;
  } else if (!loadingUnits && !units.length) {
    return <Typography variant="h3">No Units found</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Type</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Expiry Date</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.type}
              </StyledTableCell>
              <StyledTableCell align="right">{row.quantity}</StyledTableCell>
              <StyledTableCell align="right">{row.expiry}</StyledTableCell>
              <StyledTableCell align="right">
                {/* Modal for user to input requested units */}
                <RequestInput open={openRequestModal} handleClose={handleClose} />
                <Button
                  disabled={row.expiry.includes("ago")}
                  onClick={() => {
                    setOpenRequestModal(true);
                    setRequestUnits((prev) => {
                      return { ...prev, blood: row.type, date: new Date() };
                    });
                  }}
                >
                  {row.expiry.includes("ago") ? <span style={{ color: "red" }}>Expired</span> : "Request"}
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
