import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import { Chart } from "react-google-charts";
import customFetch from "../../../utils/axios";
import BankRequests from "../../../components/Admin/BankRequests";

const SingleBank = () => {
  const { bankId } = useParams();
  const [units, setUnits] = useState([]);
  const [name, setName] = useState(null);
  const [unitsReduced, setUnitsReduced] = useState({});
  const [pieData, setPieData] = useState([]);
  const [bankReqs, setBankReqs] = useState([]);

  const getBankUnits = async (id) => {
    try {
      const res = await customFetch.get(`/bank-blood/${id}`);
      const bankUnits = await res?.data;

      if (bankUnits) {
        setName(bankUnits[0]?.bank?.name);
        setUnits(bankUnits);

        // Create pie data
        setUnitsReduced(
          bankUnits?.reduce(
            (allBloods, unit) => {
              if (unit?.bloodType in allBloods) {
                allBloods[unit?.bloodType] += unit?.quantity;
              } else {
                allBloods[unit?.bloodType] = unit?.quantity;
              }
              return allBloods;
            },
            { "blood Type": "quantity" }
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBankRequests = async (id) => {
    try {
      const req = await customFetch.get("/requests");
      const requests = req?.data;
      if (requests) {
        setBankReqs(requests.filter((r) => r.bank === id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (bankId) {
      getAllBankRequests(bankId);
    }
  }, [bankId]);

  useEffect(() => {
    if (bankId) {
      getBankUnits(bankId);
    }
  }, [bankId]);

  useEffect(() => {
    if (Object.keys(unitsReduced).length) {
      setPieData(Object.entries(unitsReduced));
    }
  }, [unitsReduced]);
  const data = [
    ["Region", "Requests"],
    ["Nairobi", 11],
    ["Central", 2],
    ["Coast", 2],
    ["Western", 2],
    ["Eastern", 7],
  ];
  const pieOptions = {
    title: "Available Units",
  };

  const vertData = [
    ["Month", "Approved", "Declined", "Pending"],
    ["Feb", 130, 2, 17],
    ["March", 100, 0, 20],
    ["April", 117, 6, 25],
    ["May", 66, 2, 30],
    ["June", 103, 4, 35],
    ["July", 131, 0, 35],
  ];

  const vertOptions = {
    chart: {
      title: "Requests by status",
      subtitle: "Represents all requests by status within the last six months",
    },
  };

  return (
    <section className="section section-center">
      <Navbar />
      <h2>Welcome to {name}</h2>
      <br />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 500,
          },
        }}
      >
        <Paper elevation={3}>
          <Chart chartType="PieChart" data={pieData} options={pieOptions} width={"100%"} height={"400px"} />
        </Paper>
        <Paper elevation={3}>
          <Chart chartType="Bar" width="100%" height="400px" data={vertData} options={vertOptions} />;
        </Paper>
      </Box>
      <BankRequests data={bankReqs} />
    </section>
  );
};

export default SingleBank;
