import React from "react";
import styled from "styled-components";
import Regions from "./Regions";
import Clients from "./Clients";

const Users = () => {
  return (
    <section className="section">
      <Wrapper className="section-center">
        <Regions />
        <Clients />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  gap: 3rem 2rem;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  /* align-items: start; */
`;

export default Users;
