import mongoose from "mongoose";
import orderStatuses from "../../config/orderStatusConfig.js";

const orderSchema = new mongoose.Schema(
  {
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
      default: "Vendor Selection",
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
