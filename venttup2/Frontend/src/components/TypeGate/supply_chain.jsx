import React from "react";
import orderStatuses from "../../config/orderStatusConfig.js";

const arrayOfStatuses = orderStatuses.supply_chain;
const Supply_chain = (stepNumber) => {
  switch (stepNumber) {
    case 1:
      return (
        <div>
          <h1>Supply Chain Step 1</h1>
        </div>
      );
    case 2:
      return (
        <div>
          <h1>Supply Chain Step 2</h1>
        </div>
      );
    case 3:
      return (
        <div>
          <h1>Supply Chain Step 3</h1>
        </div>
      );
    case 4:
      return (
        <div>
          <h1>Supply Chain Step 4</h1>
        </div>
      );
    case 5:
      return (
        <div>
          <h1>Supply Chain Step 5</h1>
        </div>
      );
    default:
      return (
        <div>
          <h1>Supply Chain Step Default</h1>
        </div>
      );
  }
  return <div></div>;
};

export default Supply_chain;
