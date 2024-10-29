import Order from "../database/models/order.model.js";

import Vendor from "../database/models/vendor.model.js";
import Customer from "../database/models/customer.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/GenerateJWT.js";
import orderStatuses from "../config/orderStatusConfig.js";

export const LoginVendor = async (req, res) => {
  try {
    const { GSTIN, password } = req.body;
    if (!GSTIN || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const vendor = await Vendor.findOne({ GSTIN });
    if (!vendor) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid Credentials" });
    }
    const { userID, token, LoggedInUserType } = generateTokenAndSetCookie(
      vendor._id,
      "vendor",
      res
    );
    res.status(200).json({ userID, token, LoggedInUserType });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const LogoutVendor = async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "Development",
  });
  res.status(200).json({ message: "Logout Successful" });
};

export const SignupVendor = async (req, res) => {
  try {
    const { GSTIN, password, ConfirmPassword, address, contactNumber } =
      req.body;

    if (!GSTIN || !password || !address || !contactNumber) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    if (password !== ConfirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const vendor = await Vendor.findOne({ GSTIN });
    if (vendor) {
      return res.status(400).json({ message: "Vendor already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newVendor = new Vendor({
      GSTIN,
      password: hashedPassword,
      address,
      contactNumber,
    });

    await newVendor.save();
    generateTokenAndSetCookie(newVendor, "vendor", res);
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const AcceptOrders = async (req, res) => {
  try {
    const { orderId, vendorId } = req.body;
    if (!orderId || !vendorId) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.vendorId !== vendorId) {
      return res
        .status(401)
        .json({ message: "You are not authorized to accept this order" });
    }
    order.currentStatus = "Vendor Accepted";
    order.currentStep = 1;
    await order.save();
    res.status(200).json({ message: "Order Accepted", orderId, vendorId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const DeclineOrders = async (req, res) => {
  try {
    const { orderId, vendorId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const order = await OrderStatus.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.vendorId !== vendorId) {
      return res
        .status(401)
        .json({ message: "You are not assigned to this order" });
    }
    order.vendorId = null;
    await order.save();
    res.status(200).json({ message: "Order Declined" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const UpdateProgress = async (req, res) => {
  try {
    console.log(req.body);
    const { orderId, vendorId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const order = await Order.findbyId(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.vendorId !== vendorId) {
      return res
        .status(401)
        .json({ message: "You are not authorized to update this order" });
    }
    order.currentStep += 1;
    const arr = orderStatuses[order.orderType];

    if (order.currentStep <= arr.length) {
      order.currentStatus = arr[order.currentStep];
      order.adminApproval = false;
    } else {
      order.currentStatus = "Order Completed";
    }
    await order.save();
    res
      .status(200)
      .json({ message: "Progress Updated waiting for admin approval" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const GetVendorOrders = async (req, res) => {
  try {
    const { vendorId } = req.body;
    if (!vendorId) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const orders = await OrderStatus.find({ vendorId });

    let Orders = [];
    for (let i = 0; i < orders.length; i++) {
      const order = await Order.findById(orders[i].orderId);
      Orders[i] = order;
    }

    res.status(200).json(Orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const GetCustomerDetails = async (req, res) => {
  try {
    const { customerId } = req.body;
    if (!customerId) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const ordersCustomer = await OrderStatus.find({ customerId });
    let allowed = false;
    for (let i = 0; i < ordersCustomer.length; i++) {
      if (ordersCustomer[i].vendorId === req.body.vendorId) {
        allowed = true;
        break;
      }
    }
    if (!allowed) {
      return res
        .status(401)
        .json({ message: "You are not authorized to view this customer" });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const { GSTIN, address, contactNumber } = customer;
    res.status(200).json({ GSTIN, address, contactNumber });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
