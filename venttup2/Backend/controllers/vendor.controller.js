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
    if (order.vendorId != vendorId) {
      return res
        .status(401)
        .json({ message: "You are not authorized to accept this order" });
    }
    order.currentStatus = "Vendor Accepted";
    order.currentStep += 1;
    const vendor = await Vendor.findById(vendorId);
    vendor.currentOrder = orderId;
    await order.save();
    res.status(200).json({ message: "Order Accepted", orderId, vendorId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const DeclineOrders = async (req, res) => {
  try {
    const { orderId, vendorId } = req.body;
    if (!orderId || !vendorId) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.vendorId != vendorId) {
      return res
        .status(401)
        .json({ message: "You are not authorized to decline this order" });
    }
    order.currentStatus = "Vendor Selection";
    order.currentStep -= 1;
    order.vendorId = null;
    await order.save();
    res.status(200).json({ message: "Order Declined" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const UpdateProgress = async (req, res) => {
  try {
    const { orderId, vendorId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.vendorId != vendorId) {
      return res
        .status(401)
        .json({ message: "You are not authorized to update this order" });
    }
    if (!order.adminApproval) {
      return res.status(200).json({ message: "Waiting for admin approval" });
    }
    if (order.currentStatus === "GRN") {
      return res
        .status(400)
        .json({ message: "Order waiting for customer approval" });
    }
    if (order.currentStatus === "Order completed") {
      return res.status(400).json({ message: "Order already completed" });
    }
    const arr = orderStatuses[order.orderType];
    if (order.currentStep + 1 < arr.length) {
      order.currentStep += 1;
      order.currentStatus = arr[order.currentStep];
      order.adminApproval = false;
    } else {
      res.status(400).json({ message: "Invalid request" });
    }
    await order.save();
    res
      .status(200)
      .json({ message: "Progress Updated waiting for admin approval" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const GetVendorOrders = async (req, res) => {
  try {
    const { vendorId, filter } = req.body;
    if (!vendorId) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const orders = await Order.find({ vendorId: vendorId, ...filter });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const GetCustomerDetails = async (req, res) => {
  try {
    const { vendorId, orderId } = req.params;

    if (orderId) {
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      if (order.vendorId !== vendorId) {
        return res.status(401).json({
          message: "You are not authorized to view this order details",
        });
      }
      const customer = await Customer.findById(order.customerId);
      res.status(200).json(customer);
    } else {
      const { customerId } = req.body;
      const order = await Order.findOne({ customerId });
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      if (order.vendorId !== vendorId) {
        return res.status(401).json({
          message: "You are not authorized to view this order details",
        });
      }
      const customer = await Customer.findById(customerId);
      res.status(200).json(customer);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
