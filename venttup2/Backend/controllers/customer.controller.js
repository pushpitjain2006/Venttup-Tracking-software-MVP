import Customer from "../database/models/customer.model.js";
import Order from "../database/models/order.model.js";
import Vendor from "../database/models/vendor.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/GenerateJWT.js";

export const LoginCustomer = async (req, res) => {
  try {
    const { GSTIN, password } = req.body;
    if (!GSTIN || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const customer = await Customer.findOne({ GSTIN });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const { token, LoggedInUserType, userID } = generateTokenAndSetCookie(
      customer._id,
      "customer",
      res
    );
    return res.status(200).json({ token, LoggedInUserType, userID });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const LogoutCustomer = async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "Development",
  });
  res.status(200).json({ message: "Logout successful" });
};

export const SignupCustomer = async (req, res) => {
  try {
    const { GSTIN, password, ConfirmPassword, address, contactNumber } =
      req.body;

    if (!GSTIN || !password || !address || !contactNumber) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    if (password !== ConfirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const customer = await Customer.findOne({ GSTIN });
    if (customer) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newCustomer = new Customer({
      GSTIN,
      password: hashedPassword,
      address,
      contactNumber,
    });

    await newCustomer.save();
    generateTokenAndSetCookie(newCustomer._id, "customer", res);
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const VendorDetails = async (req, res) => {
  try {
    const { VendorId } = req.params;
    if (!VendorId) {
      return res.status(400).json({ message: "Please provide VendorId" });
    }
    const vendor = await Vendor.findById(VendorId);
    if (!vendor) {
      return res.status(400).json({ message: "Vendor not found" });
    }
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const PlaceOrders = async (req, res) => {
  try {
    const { orderType, totalAmount, customerId, sector, comments } = req.body;
    if (!orderType || !totalAmount) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const newOrder = new Order({
      customerId,
      orderType,
      totalAmount,
      customer: req.userId,
      sector,
      comments,
    });
    await newOrder.save();
    res.status(201).json({ message: "Order requested successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const ApproveGRN = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: "Please provide orderId" });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }
    if (order.currentStatus !== "GRN") {
      return res.status(400).json({ message: "GRN not yet submitted" });
    }
    order.currentStatus = "GRN Approved";
    order.currentStep += 1;
    order.adminApproval = false;
    order.customerApproval = true;
    await order.save();
    res.status(200).json({ message: "GRN Approved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const ConfirmGate = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: "Please provide orderId" });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }
    order.customerApproval = true;
    await order.save();
    res.status(200).json({ message: "Update Confirmed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
