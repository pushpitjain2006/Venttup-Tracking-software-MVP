import React, { useState } from "react";
import orderStatuses from "../../config/orderStatusConfig.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { toast } from "react-toastify";
import useAxios from "../../utils/useAxios.js";

const Localization = ({ values }) => {
  const { stepNumber, order } = values;
  console.log("Order:", order);
  const arrayOfStatuses = orderStatuses.localization;
  const { auth } = useAuth();
  const userType = auth.userType;
  const [file, setFile] = useState(null);
  const axios = useAxios();

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
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {userType === "customer" && !order.customerApproval ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => {
              handelApproveCustomer();
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
          >
            Approve
          </button>
        </div>
      ) : (
        ""
      )}
      {document?.url ? (
        <div>
          <p>Document Preview:</p>
          <iframe
            src={document.url}
            title="Document Preview"
            style={{ width: "100%", height: "500px", border: "1px solid #ccc" }}
          ></iframe>
          <a
            href={document.url}
            download
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              textDecoration: "none",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Download
          </a>
        </div>
      ) : (
        ""
      )}
      <div>
        <input
          type="file"
          onChange={handleChangeDocument}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        />
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onClick={handleUploadDocument}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Localization;
