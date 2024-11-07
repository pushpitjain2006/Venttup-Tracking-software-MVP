import { useEffect, useState } from "react";
import orderStatuses from "../../config/orderStatusConfig";
import StepIndicator from "../StepIndicator";
import useAxios from "../../utils/useAxios";
import GateDetails from "../GateDetails";
import { toast } from "react-toastify";

const OrderProgress = ({ order }) => {
  const axios = useAxios();
  const [file, setFile] = useState(null);
  const stages = order ? orderStatuses[order.orderType] : [];
  const [focusStep, setFocusStep] = useState(order.currentStep);
  const [POfile, setPOfile] = useState(null);

  const POfileURL = order.documents.find((file) => file.name === "PO")?.url;

  const POfetch = async () => {
    try {
      const response = await fetch(POfileURL);
      setPOfile(response);
    } catch (error) {
      console.error(
        "Failed to fetch PO file:",
        error.response || error.message || error
      );
    }
  };
  useEffect(() => {
    POfetch();
  }, [POfileURL]);
  useEffect(() => {
    setFocusStep(order.currentStep);
  }, [order]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      toast.info("File not selected.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.info("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("orderId", order._id);
    formData.append("documentName", stages[focusStep]);
    try {
      const response = await axios.post("/admin/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast.success("File uploaded successfully!");
      } else {
        toast.error("Failed to upload file.");
      }
    } catch (error) {
      toast.error("Failed to upload file.");
      console.error("Upload error:", error.response || error.message || error);
    }
  };

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
          <div className="w-full bg-blue-500 text-white p-4 mt-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">
              Step {focusStep + 1}: {stages[focusStep]}
            </h3>
            {GateDetails({ order, stepNumber: focusStep })}
            {order?.currentStep === 3 && (
              <>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-2 mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                  onClick={handleUpload}
                >
                  Upload PO
                </button>
                {POfile && (
                  <div className="mt-4">
                    <h4 className="text-md font-semibold">Preview:</h4>
                    <iframe
                      src={POfile}
                      title="PO File Preview"
                      className="w-full h-64 border"
                    ></iframe>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderProgress;
