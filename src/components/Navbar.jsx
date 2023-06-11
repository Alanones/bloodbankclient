import React, { useContext } from "react";
import styled from "styled-components";
import { ClientContext } from "../contexts/client";
import { useNavigate } from "react-router-dom";
import AddBlood from "./Admin/Charts/AddBlood";
import AddBank from "./Admin/Charts/AddBank";

const Navbar = () => {
  const [openAddBloodModal, setOpenAddBloodModal] = React.useState(false);
  const [openAddBankModal, setOpenAddBankModal] = React.useState(false);
  const handleOpen = () => setOpenAddBloodModal(true);
  const handleClose = () => setOpenAddBloodModal(false);
  const handleOpenBank = () => setOpenAddBankModal(true);
  const handleCloseBank = () => setOpenAddBankModal(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(ClientContext);

  return (
    <Wrapper>
      <h4>
        welcome, <strong>{user?.user?.name.toUpperCase()}</strong>
      </h4>
      <span>
        {user?.user.isAdmin ? (
          <>
            <button onClick={handleOpenBank}>Add New Region</button>
            <button onClick={handleOpen}>Add New Blood Unit</button>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              logout
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            logout
          </button>
        )}
        <AddBlood open={openAddBloodModal} handleClose={handleClose} />
        <AddBank open={openAddBankModal} handleClose={handleCloseBank} />
      </span>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`;

export default Navbar;
