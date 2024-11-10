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
    order.AdminSeen = false;
    order.CustomerSeen = false;
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
    order.AdminSeen = false;
    order.CustomerSeen = false;
    await order.save();
    res.status(200).json({ message: "Order Declined" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const UpdateProgressVendor = async (req, res) => {
  try {
    const { orderId, vendorId, action } = req.body;
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
        .json({ message: "You are not authorized to update this order" });
    }

    if (action === "withdraw") {
      if (!order.adminApproval) {
        order.currentStep -= 1;
        order.currentStatus = orderStatuses[order.orderType][order.currentStep];
        order.adminApproval = true;
        await order.save();
        return res
          .status(200)
          .json({ message: "Submission withdrawn successfully" });
      } else {
        return res
          .status(400)
          .json({ message: "Cannot withdraw after admin approval" });
      }
    }

    if (!order.adminApproval) {
      return res.status(400).json({ message: "Waiting for admin approval" });
    }
    if (!order.customerApproval) {
      return res.status(400).json({ message: "Waiting for customer approval" });
    }
    if (order.currentStatus === "GRN") {
      return res
        .status(400)
        .json({ message: "Order waiting for customer approval" });
    }
    if (order.currentStatus === "Order completed") {
      return res.status(400).json({ message: "Order already completed" });
    }
    // Define gates and logic for specific order types
    const arr = orderStatuses[order.orderType];
    const isLocalization = order.orderType === "localization";
    const isSupplyChain = order.orderType === "supply chain";
    const isContractManufacturing =
      order.orderType === "contract_manufacturing";
    if (!arr) {
      return res.status(400).json({ message: "Invalid order type" });
    }
    // Localization-specific gates and approvals
    if (isLocalization) {
      if (order.currentStatus === "Gate 2") {
        order.customerApproval = false;
      } else if (order.currentStatus === "Gate 3") {
        order.vendorApproval = false;
      }
    }
    // Supply chain-specific gates and approvals
    if (isSupplyChain) {
      if (order.currentStatus === "Vendor Accepted") {
        order.vendorApproval = false;
      } else if (order.currentStatus === "Drawing / Data Sheet Verification") {
        order.vendorApproval = false;
      } else if (order.currentStatus === "Dispatch Status") {
        order.customerApproval = false;
      }
    }
    // Contract manufacturing-specific gates and approvals
    if (isContractManufacturing) {
      if (order.currentStatus === "Vendor Accepted") {
        order.vendorApproval = false;
      } else if (order.currentStatus === "PO Release") {
        order.customerApproval = false;
      } else if (order.currentStatus === "Drawing Approval") {
        order.vendorApproval = false;
      } else if (order.currentStatus === "Inspection Call") {
        order.customerApproval = false;
      } else if (order.currentStatus === "Dispatch Clearance") {
        order.vendorApproval = false;
      }
    }
    if (order.currentStep + 1 < arr.length) {
      order.currentStep += 1;
      order.adminApproval = false;
    } else {
      return res.status(400).json({ message: "Invalid request" });
    }
    order.AdminSeen = false;
    order.CustomerSeen = false;
    await order.save();
    return res
      .status(200)
      .json({ message: "Progress Updated, waiting for admin approval" });
  } catch (error) {
    console.error("Error updating progress:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
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
