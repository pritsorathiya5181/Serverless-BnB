import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { BounceLoader } from "react-spinners";
import NotFound from "./404";

const Homepage = (props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 2500));
      setLoading((loading) => !loading);
    };

    loadData();
  }, []);
  if (props.auth.user) {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <BounceLoader size={72} color="black" />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center">
          <Helmet>
            <title>B&B | Home</title>
          </Helmet>
        </div>
      );
    }
  }
  return <NotFound />;
};

export default Homepage;
