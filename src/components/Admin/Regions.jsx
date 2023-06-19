import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Tooltip from "@mui/material/Tooltip";
import { useContext } from "react";
import { AdminContext } from "../../contexts/admin";
import BankDelete from "./DeleteDialog";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import EditBank from "./EditBank";

const Regions = () => {
  const { allBanks, setBankCrud } = useContext(AdminContext);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [bank, setBank] = useState({ id: "", name: "", address: "" });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deleteBank = async (id) => {
    try {
      setLoading(true);
      const res = await customFetch.delete(`/banks/${id}`);
      if (res?.data) {
        setBankCrud(true);
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
      {/* Delete bank modal */}
      <BankDelete
        open={open}
        name={name}
        item="Bank"
        loading={loading}
        handleClose={handleClose}
        deleteUser={() => {
          deleteBank(id);
        }}
      />

      {/* Edit bank Modal */}
      <EditBank
        open={openEdit}
        id={bank.id}
        bankName={bank.name}
        bankAddress={bank.address}
        handleClose={() => {
          setOpenEdit(false);
          setBank({ id: "", name: "", address: "" });
        }}
      />
      <div className="users">
        {allBanks?.map((bank, index) => {
          const { address, name } = bank;
          return (
            <article key={index}>
              {/* <img src={img} alt={name} /> */}
              <div>
                <Link to={`banks/${bank._id}`} target="_blank">
                  <h4 style={{ cursor: "pointer" }}>{name}</h4>
                </Link>
                <p>{address}</p>

                <span className="title">
                  <Tooltip title="edit">
                    <ModeEditOutlineOutlinedIcon
                      color="success"
                      onClick={() => {
                        setOpenEdit(true);
                        setBank({ name, address, id: bank._id });
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="delete">
                    <DeleteOutlineOutlinedIcon
                      color="error"
                      onClick={() => {
                        handleClickOpen();
                        setId(bank._id);
                        setName(name);
                      }}
                    />
                  </Tooltip>
                </span>
              </div>
              {/* Modal to show info for each bank */}

              {/* Modal to show info for each bank */}
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
    content: "Regions";
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
      left: 380px;
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
export default Regions;
