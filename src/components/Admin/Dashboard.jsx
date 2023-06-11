import React from "react";
import Navbar from "../Navbar";
import Info from "./Info";
import Users from "./Users";
import Stats from "./Stats";

const Dashboard = () => {
  return (
    <main>
      <Navbar />
      <Info />
      <Users />
      <Stats />
    </main>
  );
};

export default Dashboard;
