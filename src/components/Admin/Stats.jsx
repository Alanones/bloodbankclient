import React from "react";
import styled from "styled-components";
import Pie from "./Charts/Pie";
import VerticalChart from "./Charts/Vertical";
import Donut from "./Charts/Donut";
import Horizontal from "./Charts/Horizontal";

const Stats = () => {
  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie />
        <VerticalChart />
        <Horizontal />
        <Donut />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

export default Stats;
