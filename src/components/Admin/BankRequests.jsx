import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";

function createData(blood, quantity, status, owner, date) {
  return { blood, quantity, status, owner, date };
}

export default function BasicTable({ data }) {
  if (!data.length) return <h3 style={{ color: "red" }}>No request data found!</h3>;
  const rows = data?.map((row) => {
    return createData(
      row?.blood,
      row?.quantity,
      row?.status,
      row?.owner?.location,
      moment(row?.date).format("MMM Do YYYY")
    );
  });
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Blood Type</TableCell>
            <TableCell align="right">Quantity Requested</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Requested by</TableCell>
            <TableCell align="right">Request Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.blood}
              </TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.owner}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
