import React from "react";
import orderStatuses from "../config/orderStatusConfig";
import { CheckCircle, Leaf } from "lucide-react";

const ProgressBar = ({ order, setCurrentStep, isAcceptancePending }) => {
  const stages = order ? orderStatuses[order.orderType] || [] : [];

  return (
    <div className="mt-8 flex justify-center px-4">
      <div className="flex flex-wrap items-start justify-center gap-6 lg:flex-nowrap max-w-full">
        {stages.map((stage, index) => {
          const isCompleted = index < order?.currentStep;
          const isCurrent = index === order?.currentStep;
          const isGateStage = stage.toLowerCase().includes("gate");

          return (
            <div
              key={index}
              className="flex items-center flex-col sm:w-24 md:w-28 lg:w-32 text-center"
            >
              <div
                className={`relative flex items-center justify-center
                w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 transition-all duration-300
                ${isCompleted ? "bg-green-700 border-green-700 text-white" : ""}
                ${
                  isCurrent
                    ? isAcceptancePending
                      ? "bg-yellow-400 border-yellow-400 text-white"
                      : "border-gray-300 text-gray-400"
                    : ""
                }
                ${
                  !isCompleted && !isCurrent
                    ? "border-gray-300 text-gray-400"
                    : ""
                }
                cursor-pointer hover:scale-105`}
                onClick={() => setCurrentStep(index)}
              >
                {isCompleted ? (
                  <CheckCircle size={20} />
                ) : isGateStage ? (
                  <Leaf size={20} />
                ) : (
                  <span className="text-sm sm:text-base md:text-lg">
                    {index + 1}
                  </span>
                )}
              </div>

              <div
                className={`mt-2 text-xs sm:text-sm md:text-base font-medium transition duration-300
                ${
                  isCompleted || isCurrent ? "text-green-700" : "text-gray-500"
                }`}
              >
                {stage}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
