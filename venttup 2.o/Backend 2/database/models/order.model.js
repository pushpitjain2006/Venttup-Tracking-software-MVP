import mongoose from "mongoose";

function currentStatusArray(OrderType) {
  if (OrderType === "localization") {
    return [
      "Vendor Selection",
      "Gate 0",
      "Gate 1",
      "Gate 2",
      "Gate 3",
      "Gate 4",
      "Gate 5",
      "Gate 6",
      "Gate 7",
    ];
  } else if (OrderType === "contract_manufacturing") {
    return [
      "Vendor Selection",
      "PO Release",
      "Drawing Submission",
      "Drawing Approval",
      "Manufacturing clearance",
      "Inspection",
      "Dispatch Clearance",
      "Material Receipt",
      "GRN",
    ];
  } else if (OrderType === "supply_chain") {
    return [
      "Vendor Selection",
      "PO Release",
      "Drawing / Data Sheet Verification",
      "Manufacturing clearance",
      "Inspection",
      "Dispatch Clearance",
      "Material Receipt",
      "GRN",
    ];
  }
}

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
      enum: currentStatusArray(this.orderType),
      default: "Vendor Selection",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
