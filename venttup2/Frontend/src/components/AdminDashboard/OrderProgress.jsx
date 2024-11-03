import { useState } from "react";
import orderStatuses from "../../config/orderStatusConfig";
import StepIndicator from "../StepIndicator";
import useAxios from "../../utils/useAxios";

const OrderProgress = ({ order }) => {
  const axios=useAxios();
  const [file, setFile] = useState(null);
  const stages = order ? orderStatuses[order.orderType] || [] : [];
  const [focusStep, setFocusStep] = useState(order.currentStep);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async() => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); 

    try {
      const response = await axios.post("/admin/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Failed to upload file.");
      console.error("Upload error:", error);
    }
  };

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
            {(order?.currentStep===3)&&(
              <>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-2 mb-4 p-2 border rounded"
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleUpload}
                > 
                  Upload PO
                </button>
              </>
            )}

          </div>
        )}
      </div>
    </>
  );
};

export default OrderProgress;
