import React from "react";
import Localization from "./TypeGate/localization.jsx";
import Contract_manufacturing from "./TypeGate/contract_manufacturing.jsx";
import Supply_chain from "./TypeGate/supply_chain.jsx";

const GateDetails = (values) => {
  const { order } = values;
  const orderType = order.orderType;
  if (orderType == "localization") {
    return <Localization values={values} />;
  } else if (orderType == "contract_manufacturing") {
    return <Contract_manufacturing values={values} />;
  }
  return <Supply_chain values={values} />;
};

export default GateDetails;
