import React from "react";
import { useLocation } from "react-router-dom";

const SuccessPayment = () => {
  const location = useLocation();

  return <h1>SuccessPayment</h1>;
};

export default SuccessPayment;
