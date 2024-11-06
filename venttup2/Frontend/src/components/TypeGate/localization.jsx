import React from "react";
import orderStatuses from "../../config/orderStatusConfig.js";
import { useAuth } from "../../../context/AuthContext.jsx";

const Localization = (values) => {
  console.log("Localization values:", values);
  const { stepNumber, order } = values;

  const arrayOfStatuses = orderStatuses.localization;
  const auth = useAuth();
  const userType = auth.userType;
  if (
    userType === "customer" &&
    (arrayOfStatuses[stepNumber] == "Gate 3" ||
      arrayOfStatuses[stepNumber] == "Gate 4")
  ) {
    
  }
  return (
    <div>
      <h1>Localization Step {stepNumber}</h1>
    </div>
  );
};

export default Localization;
