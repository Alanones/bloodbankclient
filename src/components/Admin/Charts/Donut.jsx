import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Region", "Requests"],
  ["Nairobi", 11],
  ["Central", 2],
  ["Coast", 2],
  ["Western", 2],
  ["Eastern", 7],
];

export const options = {
  title: "Regions by request",
  pieHole: 0.4,
  is3D: false,
};

export default function Donut() {
  return <Chart chartType="PieChart" width="100%" height="400px" data={data} options={options} />;
}
