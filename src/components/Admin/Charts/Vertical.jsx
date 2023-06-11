import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Month", "Approved", "Declined", "Pending"],
  ["March", 1000, 400, 200],
  ["April", 1170, 460, 250],
  ["May", 660, 1120, 300],
  ["June", 1030, 540, 350],
];

export const options = {
  chart: {
    title: "Requests by type",
    subtitle: "Represents all requests by type within the last six months",
  },
};

export default function Vertical() {
  return (
    <div>
      <Chart chartType="Bar" width="100%" height="400px" data={data} options={options} />;
    </div>
  );
}
