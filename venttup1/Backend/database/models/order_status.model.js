import mongoose from "mongoose";

const orderStatusSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    totalGates: {
      type: Number,
      required: true,
      enum: [1, 8],
    },
    gateNumber: {
      type: Number,
      required: true,
      default: 1,
      enum: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      default: null,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'], 
      default: "pending",
    },
    progress : {
      type: Number,
      default: 0,
      enum: [0, 1, 2, 3, 4, 5],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("OrderStatus", orderStatusSchema);

// order_status.findOne({ orderId: orderId, gateNumber: gateNumber }
// vs
// order_status.findbyID(array[0])