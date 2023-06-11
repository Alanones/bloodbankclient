import React, { useState, useEffect } from "react";
import { getUserFromLocalStorage } from "../utils/localStorage";
import customFetch from "../utils/axios";
import moment from "moment";

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
    if (auth) {
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
  }, [bankId]);

  useEffect(() => {
    if (user) {
      getAllRequests();
    }
  }, [user]);

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
      // if (!bankUnits) return setUnits([]);
      const today = new Date();
      setUnits(
        bankUnits
          .sort(function (a, b) {
            return a.expiry.localeCompare(b.expiry);
          })
          .filter((unit) => {
            return moment(unit.expiry).isAfter(today);
          })
      );
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
        logout,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export { ClientContext, ClientProvider };
