import { useState } from "react";
import orderStatuses from "../../config/orderStatusConfig";

const OrderProgress = ({ order }) => {
  const stages = order ? orderStatuses[order.orderType] || [] : [];
  const isGateStage = (stage) => {
    const parts = stage.split(" ");
    return parts[0] === "Gate";
  };

  const [focusStep, setFocusStep] = useState(order.currentStep);

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="flex items-center justify-start w-full bg-red-400 p-4 overflow-x-auto">
          {stages.map((stage, index) => (
            <div
              key={index}
              className="flex flex-col items-center mx-2"
              onClick={() => setFocusStep(focusStep === index ? null : index)}
            >
              <div
                className={`flex items-center justify-center w-12 h-12 m-1 ${
                  index <= order?.currentStep ? "bg-green-500" : "bg-gray-300"
                } ${
                  order.orderType === "localization"
                    ? isGateStage(stage)
                      ? "rounded-full"
                      : "rounded"
                    : "rounded w-12 h-12"
                } text-white font-bold transition duration-300 ease-in-out cursor-pointer`}
              >
                {index + 1}
              </div>
              <p className="text-xs text-gray-200 mt-1">{stage}</p>
            </div>
          ))}
        </div>

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
