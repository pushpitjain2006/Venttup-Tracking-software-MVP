import React, { useState } from "react";
import orderStatuses from "../../config/orderStatusConfig.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { toast } from "react-toastify";
import useAxios from "../../utils/useAxios.js";
import DocumentPreview from "../DocumentPreviewDownload";

const Localization = ({ values }) => {
  const { stepNumber, order } = values;
  console.log("Order:", order);
  const arrayOfStatuses = orderStatuses.localization;
  const { auth } = useAuth();
  const userType = auth.userType;
  const [file, setFile] = useState(null);
  const axios = useAxios();
  const themeColor = userType === "admin" ? "blue" : "green";
  const handelApproveCustomer = async () => {
    try {
      const response = await axios.post("/customer/approve-order", {
        orderId: order._id,
      });
      console.log("Response:", response);
      toast.success("Order approved successfully!");
    } catch (error) {
      toast.error("Failed to approve order.");
      console.error(
        "Failed to approve order:",
        error.response || error.message || error
      );
    }
  };

  const document = order.documents.find(
    (doc) => doc.name === arrayOfStatuses[stepNumber]
  );

  const handleChangeDocument = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      toast.info("File not selected.");
    }
  };

  const handleUploadDocument = async () => {
    if (!file) {
      toast.info("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("orderId", order._id);
    formData.append("documentName", arrayOfStatuses[stepNumber]);
    try {
      const response = await axios.post(`/${userType}/upload`, formData, {
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
      console.error("Upload error:", error.response || error.message || error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-5 px-4 sm:px-8 lg:px-16 xl:px-24">
      {userType === "customer" && !order.customerApproval ? (
        <div className="mt-5">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-md cursor-pointer transition-colors duration-300 ease-in-out hover:bg-green-700 w-full sm:w-auto"
            onClick={handelApproveCustomer}
          >
            Approve
          </button>
        </div>
      ) : null}

      <DocumentPreview document={document} themeColor={themeColor} />

      <div className="flex flex-col sm:flex-row sm:items-center mt-8 gap-4 w-full max-w-3xl">
        <input
          type="file"
          onChange={handleChangeDocument}
          className={`w-full sm:w-auto px-5 py-3 bg-${themeColor}-600 text-white rounded-md cursor-pointer transition-colors duration-300 ease-in-out hover:bg-${themeColor}-800 text-center`}
        />
        <button
          className={`w-full sm:w-auto px-5 py-3 bg-${themeColor}-600 text-white rounded-md cursor-pointer transition-colors duration-300 ease-in-out hover:bg-${themeColor}-800 text-center`}
          onClick={handleUploadDocument}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Localization;
