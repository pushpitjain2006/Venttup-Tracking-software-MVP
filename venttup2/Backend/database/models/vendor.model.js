import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    GSTIN: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    currentOrderCapacity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Vendor", vendorSchema);
