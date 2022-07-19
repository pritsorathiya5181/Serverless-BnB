import React from "react";
import { Helmet } from "react-helmet";
import NotFound from "./404";
import { useNavigate } from "react-router-dom";

const Homepage = (props) => {
  const navigate = useNavigate();
  const navigateTour = () => {
    navigate("/tour");
  };

  const navigateOrder = () => {
    navigate("/orders");
  };
  const navigateRoomVA = () => {
    navigate("/roomVA");
  };
  const navigateKitchenVA = () => {
    navigate("/kitchenVA");
  };
  if (props.auth.user) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Helmet>
          <title>B&B | Home</title>
        </Helmet>
        <div className="grid grid-cols-1 gap-3 w-full lg:w-96">
          <div className="flex flex-col mb-2">
            <button
              onClick={navigateTour}
              className="border-gray-600 text-black border-2 rounded-md font-bold text-xl hover:bg-gray-600 hover:text-white mt-4 p-2"
              type="submit"
            >
              Search Tours
            </button>
            <button
              onClick={navigateOrder}
              className="border-gray-600 text-black border-2 rounded-md font-bold text-xl hover:bg-gray-600 hover:text-white mt-4 p-2"
              type="submit"
            >
              Room and Food Details
            </button>
            <button
              onClick={navigateRoomVA}
              className="border-gray-600 text-black border-2 rounded-md font-bold text-xl hover:bg-gray-600 hover:text-white mt-4 p-2"
              type="submit"
            >
              Room Analysis
            </button>
            <button
              onClick={navigateKitchenVA}
              className="border-gray-600 text-black border-2 rounded-md font-bold text-xl hover:bg-gray-600 hover:text-white mt-4 p-2"
              type="submit"
            >
              Kitchen Analysis
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <NotFound />;
};

export default Homepage;
