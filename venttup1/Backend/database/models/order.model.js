import mongoose from "mongoose";

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
    currentStatus: {
      type: String,
      enum: ["pending", "in-progress", "Paid", "completed", "cancelled"],
      default: "pending",
    },
    GatesEntries: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
