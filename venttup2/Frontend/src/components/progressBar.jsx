import React from "react";
import orderStatuses from "../config/orderStatusConfig.js";

const ProgressBar = ({ order, setCurrentStep, isSubmissionPending }) => {
  const stages = order ? orderStatuses[order.orderType] || [] : [];
  const isGateStage = (stage) => {
    const parts = stage.split(" ");
    return parts[0] === "Gate";
  };

  return (
    <div>
      <div className="mt-8 w-full max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          {stages.map((stage, index) => (
            <div key={index} className="flex-1 flex items-center">
              <div
                className={`flex items-center justify-center ${
                  index < order?.currentStep
                    ? "bg-green-500"
                    : index === order?.currentStep
                    ? isSubmissionPending
                      ? "bg-yellow-300"
                      : "bg-green-500"
                    : "bg-gray-300"
                } ${
                  order.orderType === "localization"
                    ? isGateStage(stage)
                      ? "rounded-full w-12 h-12"
                      : "rounded w-9 h-9"
                    : "rounded w-12 h-12"
                } text-white font-bold transition duration-300 ease-in-out cursor-pointer`}
                onClick={() => setCurrentStep(index)}
              >
                {index + 1}
              </div>
              {index < stages.length - 1 && (
                <div
                  className={`flex-1 h-2 ${
                    index < order.currentStep ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
