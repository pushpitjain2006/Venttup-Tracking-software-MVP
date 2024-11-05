import React from "react";
import Localization from "./TypeGate/localization.jsx";
import Contract_manufacturing from "./TypeGate/contract_manufacturing.jsx";
import Supply_chain from "./TypeGate/supply_chain.jsx";

const GateDetails = (stepNumber, orderType) => {
  if (orderType === "localization") {
    return <Localization stepNumber={stepNumber} />;
  } else if (orderType === "contract_manufacturing") {
    return <Contract_manufacturing stepNumber={stepNumber} />;
  }
  return <Supply_chain stepNumber={stepNumber} />;
};

export default GateDetails;
