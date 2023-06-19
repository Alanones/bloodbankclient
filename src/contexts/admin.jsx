import React, { useState, useEffect } from "react";
import { getUserFromLocalStorage } from "../utils/localStorage";
import customFetch from "../utils/axios";

const AdminContext = React.createContext();

const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [allBanks, setAllBanks] = useState(null);
  const [userCrud, setUserCrud] = useState(false);
  const [bankCrud, setBankCrud] = useState(false);
  const [userRequests, setUserRequests] = useState({
    all: [],
    pending: [],
    approved: [],
    declined: [],
  });

  useEffect(() => {
    const auth = getUserFromLocalStorage();
    if (auth?.user?.isAdmin) {
      setAdmin(auth);
    }
  }, []);

  useEffect(() => {
    if (admin) {
      getAllRequests();
    }
  }, [admin]);

  useEffect(() => {
    if (admin) {
      getAllUsers();
    }
  }, [admin, userCrud]);

  useEffect(() => {
    if (admin || bankCrud) {
      getAllBanks();
    }
  }, [admin, bankCrud]);

  const getAllUsers = async () => {
    try {
      const res = await customFetch.get("/users");
      const users = await res?.data;
      if (users) {
        setAllUsers(users);
        setUserCrud(false);
      }
    } catch (e) {
      setUserCrud(false);
      console.log(e);
    }
  };
  const getAllBanks = async () => {
    try {
      const res = await customFetch.get("/banks");
      const banks = await res?.data;
      if (banks) {
        setAllBanks(banks);
        setBankCrud(false);
      }
    } catch (e) {
      setBankCrud(false);
      console.log(e);
    }
  };

  const getAllRequests = async () => {
    try {
      const res = await customFetch.get("/requests");
      const allRequests = await res?.data;
      if (allRequests) {
        const approved = allRequests.filter((req) => req.status === "Approved");
        const pending = allRequests.filter((req) => req.status === "Pending");
        const declined = allRequests.filter((req) => req.status === "Declined");
        setUserRequests({
          all: allRequests,
          pending,
          approved,
          declined,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AdminContext.Provider
      value={{ userRequests, setAdmin, admin, setUserRequests, allUsers, allBanks, setUserCrud, setBankCrud }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminProvider };
