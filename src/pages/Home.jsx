import React from "react";
import styled from "styled-components";
import login from "../images/login.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Wrapper>
      <div className="container">
        <img src={login} alt="blood donation" />
        <h1>Blood bank optimization</h1>
        <Link to="/login" className="btn">
          login / sign up
        </Link>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
    fill: var(--clr-primary-10);
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
export default Home;
