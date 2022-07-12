import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { BounceLoader } from "react-spinners";
import NotFound from "./404";

const Homepage = (props) => {
  if (props.auth.user) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Helmet>
          <title>B&B | Home</title>
        </Helmet>
        <h1 className="text-xl font-bold text-black">Welcome to Home Page</h1>
      </div>
    );
  }
  return <NotFound />;
};

export default Homepage;
