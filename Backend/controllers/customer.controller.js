import Customer from "../database/models/customer.model.js";
import Order from "../database/models/order.model.js";
import Vendor from "../database/models/vendor.model.js";
import OrderStatus from "../database/models/order_status.model.js";
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
    generateTokenAndSetCookie(customer._id, "customer", res);
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    console.log("HEHEHE");

    await newCustomer.save();
    generateTokenAndSetCookie(newCustomer._id, "customer", res);
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const PlaceOrders = async (req, res) => {
  try {
    const { customerId, orderType, totalAmount } = req.body;
    console.log(req.body);

    if (!customerId || !orderType || !totalAmount) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const newOrder = new Order({
      customerId,
      orderType,
      totalAmount,
    });
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const PaymentOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.currentStatus !== "in-progress") {
      return res
        .status(400)
        .json({ message: "Order not approved or already Paid" });
    }
    order.currentStatus = "Paid";
    await order.save();
    res.status(200).json({ message: "Payment successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const VendorDetails = async (req, res) => {
  try {
    const { customerId, vendorId } = req.body;
    if (!vendorId) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    let allowed = false;

    const VendorHistory = await OrderStatus.find({ vendorId });
    for (let i = 0; i < VendorHistory.length; i++) {
      const OrderID = VendorHistory[i].orderId;
      const order = await Order.findById(OrderID);
      if (order.customerId === customerId) {
        allowed = true;
        break;
      }
    }

    if (allowed) {
      return res
        .status(401)
        .json({ message: "You are not authorized to view this vendor" });
    }

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
