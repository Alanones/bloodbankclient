import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import customFetch from "../../../utils/axios";
import BankRequests from "../../../components/Admin/BankRequests";

const SingleBank = () => {
  const { userId } = useParams();
  const [name, setName] = useState(null);
  const [location, setLocation] = useState(null);
  const [userReqs, setUserReqs] = useState([]);

  const getAllUserRequests = async (id) => {
    try {
      const req = await customFetch.get("/requests");
      const requests = await req?.data;
      if (requests) {
        setUserReqs(requests.filter((r) => r?.owner?._id === id));
        setName(requests[0].owner.name);
        setLocation(requests[0].owner.location);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getAllUserRequests(userId);
    }
  }, [userId]);

  return (
    <section className="section section-center">
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h2>You are viewing requests made by</h2>
        <h3>
          <strong>{name}</strong>
        </h3>
        <h4>{location}</h4>

        <br />
        <BankRequests data={userReqs} />
      </div>
    </section>
  );
};

export default SingleBank;
