import React, { useState, useEffect } from "react";
import { getUserFromLocalStorage, removeUserFromLocalStorage } from "../utils/localStorage";
import customFetch from "../utils/axios";
import moment from "moment";
import { AdUnitsOutlined } from "@mui/icons-material";

const ClientContext = React.createContext();

const ClientProvider = ({ children }) => {
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openBankModal, setOpenBankModal] = useState(false);
  const [open, setUnitsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [banks, setBanks] = useState([]);
  const [units, setUnits] = useState([]);
  const [bankId, setBankId] = useState("");
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [loadUpdatedRequests, setLoadUpdatedRequests] = useState(false);
  const [loadingUserRequests, setLoadingUserRequests] = useState(true);
  const [requestUnits, setRequestUnits] = useState({
    blood: "",
    quantity: 0,
    bank: "",
    date: "",
  });
  const [userRequests, setUserRequests] = useState({
    all: [],
    pending: [],
    approved: [],
    declined: [],
  });

  useEffect(() => {
    const auth = getUserFromLocalStorage();
    if (auth && !auth?.user?.isAdmin) {
      setUser(auth);
    }
  }, []);

  useEffect(() => {
    getBanks();
  }, [user]);

  useEffect(() => {
    if (bankId) {
      getBankUnits(bankId);
    }
  }, [bankId, loadUpdatedRequests]);

  useEffect(() => {
    if (user) {
      getAllRequests();
    }
  }, [user, loadUpdatedRequests]);

  const getBanks = async () => {
    setLoadingUnits(true);
    try {
      const res = await customFetch.get("/banks");
      const allBanks = await res?.data;
      if (allBanks) {
        setLoadingUnits(false);
        setBanks(allBanks);
      }
    } catch (e) {
      setLoadingUnits(false);
      console.log(e);
    }
  };
  const getBankUnits = async (id) => {
    try {
      const res = await customFetch.get(`/bank-blood/${id}`);
      const bankUnits = await res?.data;
      const today = new Date();
      setUnits(bankUnits);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllRequests = async () => {
    try {
      setLoadingUserRequests(true);
      const res = await customFetch.get("/requests/me");
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
      setLoadingUserRequests(false);
    } catch (e) {
      setLoadingUserRequests(false);
      console.log(e);
    }
  };

  const logout = () => {
    removeUserFromLocalStorage();
    setUser(null);
  };
  return (
    <ClientContext.Provider
      value={{
        openRequestModal,
        setOpenRequestModal,
        open,
        setUnitsOpen,
        openBankModal,
        setOpenBankModal,
        user,
        setUser,
        setBanks,
        banks,
        getBanks,
        getBankUnits,
        units,
        setBankId,
        loadingUnits,
        requestUnits,
        setRequestUnits,
        userRequests,
        setUserRequests,
        loadingUserRequests,
        setLoadingUserRequests,
        setLoadUpdatedRequests,
        logout,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export { ClientContext, ClientProvider };
