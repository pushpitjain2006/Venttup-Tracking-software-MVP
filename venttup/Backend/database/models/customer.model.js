import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
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
}, {
  timestamps: true,
});

export default mongoose.model("Customer", customerSchema);
