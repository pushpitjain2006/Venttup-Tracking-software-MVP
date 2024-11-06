import { useEffect, useState } from "react";
import orderStatuses from "../../config/orderStatusConfig";
import StepIndicator from "../StepIndicator";
import useAxios from "../../utils/useAxios";

const OrderProgress = ({ order }) => {
  const axios = useAxios();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const stages = order ? orderStatuses[order.orderType] || [] : [];
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

  console.log("PO file:");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("Selected file:", selectedFile);
    } else {
      setMessage("No file selected");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("orderId", order._id);
    try {
      const response = await axios.post("/admin/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message || "File uploaded successfully!");
    } catch (error) {
      setMessage("Failed to upload file.");
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
            <p className="text-sm mt-2">
              Description and details for {stages[focusStep]}.
            </p>
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
                <p className="mt-2 text-red-500">{message}</p>
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
