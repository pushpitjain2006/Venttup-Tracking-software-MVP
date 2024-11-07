import { useState } from "react";
import orderStatuses from "../../config/orderStatusConfig";
import StepIndicator from "../StepIndicator";
import GateDetails from "../GateDetails";

const OrderProgress = ({
  order,
  handleUpdateProgress,
  handleApproveUpdate,
  handleDisapproveUpdate,
}) => {
  const stages = order ? orderStatuses[order.orderType] : [];
  const [focusStep, setFocusStep] = useState(order.currentStep);

  return (
    <>
      <div className="w-full flex flex-col items-center bg-blue-50 p-6 rounded-lg">
        <StepIndicator
          order={order}
          currentStep={order.currentStep}
          setFocusStep={setFocusStep}
          focusStep={focusStep}
        />

        {focusStep !== null && (
          <div className="w-full bg-blue-500 text-white p-4 mt-4 rounded-lg shadow-lg flex flex-col items-center">
            <h3 className="text-lg font-semibold p-2">
              Step {focusStep + 1}: {stages[focusStep]}
            </h3>
            {order.adminApproval ? (
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
                onClick={handleUpdateProgress}
              >
                <span className="text-sm">Update Progress</span>
              </button>
            ) : (
              <div className="flex mt-4">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded mr-2"
                  onClick={handleApproveUpdate}
                >
                  Approve Update
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
                  onClick={handleDisapproveUpdate}
                >
                  Disapprove Update
                </button>
              </div>
            )}
            {GateDetails({ order, stepNumber: focusStep })}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderProgress;
