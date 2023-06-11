import React, { useState, useEffect } from "react";
import { getUserFromLocalStorage } from "../utils/localStorage";
import customFetch from "../utils/axios";
import moment from "moment";

const AdminContext = React.createContext();

const AdminProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [allBanks, setAllBanks] = useState(null);
  const [userRequests, setUserRequests] = useState({
    all: [],
    pending: [],
    approved: [],
    declined: [],
  });

  useEffect(() => {
    const auth = getUserFromLocalStorage();
    if (auth?.user?.isAdmin) {
      setUser(auth);
    }
  }, []);

  useEffect(() => {
    if (user) {
      getAllRequests();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getAllUsers();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getAllBanks();
    }
  }, [user]);

  const getAllUsers = async () => {
    try {
      const res = await customFetch.get("/users");
      const users = await res?.data;
      if (users) {
        setAllUsers(users);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getAllBanks = async () => {
    try {
      const res = await customFetch.get("/banks");
      const banks = await res?.data;
      if (banks) {
        setAllBanks(banks);
      }
    } catch (e) {
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
    <AdminContext.Provider value={{ userRequests, setUserRequests, allUsers, allBanks }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminProvider };
