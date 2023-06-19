import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Region", "2010 Population", "2000 Population"],
  ["Nairobi", 8175000, 8008000],
  ["Coast", 3792000, 3694000],
  ["Western", 2695000, 2896000],
  ["Eastern", 2099000, 1953000],
  ["Central", 1526000, 1517000],
];

export const options = {
  chart: {
    title: "Requests by type",
    subtitle: "Represents all requests by type within the last six months",
  },
  hAxis: {
    title: "Total Population",
    minValue: 0,
  },
  vAxis: {
    title: "City",
  },
  bars: "horizontal",
  axes: {
    y: {
      0: { side: "right" },
    },
  },
};

export default function Horizontal() {
  return (
    <div>
      <Chart chartType="Bar" width="100%" height="400px" data={data} options={options} />
    </div>
  );
}
