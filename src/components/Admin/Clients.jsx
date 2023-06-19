import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Tooltip from "@mui/material/Tooltip";
import { AdminContext } from "../../contexts/admin";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import UserDelete from "./DeleteDialog";

const Clients = () => {
  const { allUsers, setUserCrud } = useContext(AdminContext);
  const [open, setOpen] = useState();
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      const res = await customFetch.delete(`/delete-user/${id}`);
      if (res?.data) {
        setUserCrud(true);
        toast(`${name} deleted successfully`, { type: "success" });
        setLoading(false);
        setOpen(false);
      } else {
        toast(`${name} could not be deleted`, { type: "error" });
        setOpen(false);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong", { type: "error" });
      setOpen(false);
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      {/* Delete user modal */}
      <UserDelete
        open={open}
        name={name}
        item="User"
        loading={loading}
        handleClose={handleClose}
        deleteUser={() => {
          deleteUser(id);
        }}
      />
      <div className="users">
        {allUsers?.map((user, index) => {
          const { location, name } = user;
          const [first, last] = name.split(" ");
          return (
            <article key={index}>
              {/* <img src={`https://ui-avatars.com/api/?name=${first}+${last}`} alt={name} /> */}
              <div>
                <Link to={`users/${user._id}`} target="_blank">
                  <h4 style={{ cursor: "pointer" }}>{name}</h4>
                </Link>
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
                    <DeleteOutlineOutlinedIcon
                      color="error"
                      onClick={() => {
                        handleClickOpen();
                        setId(user._id);
                        setName(user.name);
                      }}
                    />
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
