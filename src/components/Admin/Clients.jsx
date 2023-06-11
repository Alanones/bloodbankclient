import React, { useContext } from "react";
import styled from "styled-components";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Tooltip from "@mui/material/Tooltip";
import { AdminContext } from "../../contexts/admin";

const Clients = () => {
  const { allUsers } = useContext(AdminContext);

  return (
    <Wrapper>
      <div className="users">
        {allUsers?.map((user, index) => {
          const { location, name } = user;
          const [first, last] = name.split(" ");
          return (
            <article key={index}>
              {/* <img src={`https://ui-avatars.com/api/?name=${first}+${last}`} alt={name} /> */}
              <div>
                <h4>{name}</h4>
                <p>{location}</p>
                <span className="title">
                  <Tooltip title="edit">
                    <ModeEditOutlineOutlinedIcon
                      color="success"
                      onClick={() => {
                        console.log(name);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="delete">
                    <DeleteOutlineOutlinedIcon color="error" />
                  </Tooltip>
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background: var(--clr-white);
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;

  &::before {
    content: " users";
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background: var(--clr-white);
    color: var(--clr-grey-5);
    border-top-right-radius: var(--radius);
    border-top-left-radius: var(--radius);
    text-transform: capitalize;
    padding: 0.5rem 1rem 0 1rem;
    letter-spacing: var(--spacing);
    font-size: 1rem;
  }
  .users {
    overflow: scroll;
    height: 260px;
    display: grid;
    grid-template-rows: repeat(auto-fill, minmax(45px, 1fr));
    gap: 1.25rem 1rem;
    padding: 1rem 2rem;
  }
  article {
    transition: var(--transition);
    padding: 0.15rem 0.5rem;
    border-radius: var(--radius);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 1rem;
    .title {
      position: relative;
      top: -60px;
      left: 250px;
      cursor: pointer;
    }
    img {
      height: 100%;
      width: 45px;
      border-radius: 50%;
      object-fit: cover;
    }
    h4 {
      margin-bottom: 0;
    }
    a {
      color: var(--clr-grey-5);
    }
  }
`;
export default Clients;
