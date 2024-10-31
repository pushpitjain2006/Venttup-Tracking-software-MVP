import { useState } from "react";
import orderStatuses from "../../config/orderStatusConfig";
import StepIndicator from "../StepIndicator";

const OrderProgress = ({ order }) => {
  const stages = order ? orderStatuses[order.orderType] || [] : [];
  const [focusStep, setFocusStep] = useState(order.currentStep);

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <StepIndicator order={order} currentStep={order.currentStep} setFocusStep={setFocusStep}/>

        {focusStep !== null && (
          <div className="w-full bg-gray-800 text-white p-4 mt-4 rounded-lg">
            <h3 className="text-lg font-semibold">
              Step {focusStep + 1}: {stages[focusStep]}
            </h3>
            <p className="text-sm mt-2">
              Description and details for {stages[focusStep]}.
            </p>

          </div>
        )}
      </div>
    </>
  );
};

export default OrderProgress;
