import mongoose from "mongoose";
import orderStatuses from "../../config/orderStatusConfig.js";

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    orderType: {
      type: String,
      required: true,
      enum: ["localization", "contract_manufacturing", "supply_chain"],
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    currentStep: {
      type: Number,
      default: 0,
    },
    currentStatus: {
      type: String,
      enum: orderStatuses.orderType,
      default: "Waiting Admin Approval",
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      default: null,
    },
    adminApproval: {
      type: Boolean,
      default: true,
    },
    customerApproval: {
      type: Boolean,
      default: true,
    },
    vendorApproval: {
      type: Boolean,
      default: true,
    },
    sector: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      default: "",
      required: false,
    },
    documents: [
      {
        name: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    AdminSeen: {
      type: Boolean,
      default: false,
    },
    CustomerSeen: {
      type: Boolean,
      default: false,
    },
    VendorSeen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
