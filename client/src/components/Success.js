import React from "react";
import { useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  console.log("location : ", location.state.data);

  return <div>Success</div>;
};

export default Success;
