import React from "react";
import { useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  console.log("success page : ", location);

  return <div>Success</div>;
};

export default Success;
