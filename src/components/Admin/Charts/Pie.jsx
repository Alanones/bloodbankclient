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
};

export default function Pie3D() {
  return (
    <div>
      <Chart chartType="PieChart" data={data} options={options} width={"100%"} height={"400px"} />;
    </div>
  );
}
