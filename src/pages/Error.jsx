import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <h2>404</h2>
      <p>page not found</p>
      <button>
        <Link to="/">Home</Link>
      </button>
    </div>
  );
};

export default Error;
