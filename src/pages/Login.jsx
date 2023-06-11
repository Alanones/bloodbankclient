import React, { useState } from "react";
import styled from "styled-components";
import Signup from "../components/Signup";
import SignIn from "../components/SignIn";
import Button from "@mui/material/Button";

const Login = () => {
  const [login, setLogin] = useState(true);
  return (
    <Wrapper>
      {login ? (
        <section className="section">
          <h1>Login </h1>
          <SignIn />
          <span>
            Or
            <Button
              onClick={() => {
                setLogin(false);
              }}
            >
              Register
            </Button>
          </span>
        </section>
      ) : (
        <section className="section">
          <h1>Sign Up</h1>
          <Signup />
          <span>
            Or
            <Button
              onClick={() => {
                setLogin(true);
              }}
            >
              Login
            </Button>
          </span>
        </section>
      )}
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
export default Login;
