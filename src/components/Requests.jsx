import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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

function createData(blood, bank, quantity, date, status) {
  return { blood, bank, quantity, date, status };
}

// const rows = [
//   createData("A+", 2, "30/05/2023", "Nairobi", "Approved"),
//   createData("B+", 2, "30/05/2023", "Nairobi", "Rejected"),
//   createData("AB", 6, "30/05/2023", "Nairobi", "Approved"),
//   createData("O+", 3, "30/05/2023", "Nairobi", "Pending"),
//   createData("O-", 5, "30/05/2023", "Nairobi", "Approved"),
// ];

export default function Requests({ type, data }) {
  // const { all, pending, approved, declined } = data;

  if (!data[type]) return <h3>No requests found</h3>;

  const rows = [
    data[type].map((row) => {
      return createData(row.blood, row.bank.name, row.quantity, moment(row.date).format("LL"), row.status);
    }),
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Requested Blood Type</StyledTableCell>
            <StyledTableCell align="right">Blood Bank</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows[0].map((row, index) => {
            return (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.blood}
                </StyledTableCell>
                <StyledTableCell align="right">{row?.bank}</StyledTableCell>
                <StyledTableCell align="right">{row?.quantity}</StyledTableCell>
                <StyledTableCell align="right">{row?.date}</StyledTableCell>
                <StyledTableCell align="right">{row?.status}</StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
