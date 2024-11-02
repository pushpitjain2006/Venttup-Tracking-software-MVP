import Order from "../database/models/order.model.js";
import OrderStatus from "../database/models/order_status.model.js";
import Vendor from "../database/models/vendor.model.js";
import Customer from "../database/models/customer.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/GenerateJWT.js";

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

    const order = await OrderStatus.findOne({ orderId, vendorId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.vendorId = vendorId;
    order.status = "in-progress";
    order.progress = 1;
    await order.save();
    res.status(200).json({ message: "Order Accepted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const DeclineOrders = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const order = await OrderStatus.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.vendorId = null;
    order.status = "pending";
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

    const order = await OrderStatus.find({ orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    let VendorOrder = order[0];
    let allowed = false;
    let i = 0;
    for (; i < order.length; i++) {
      if (order[i].vendorId == vendorId) {
        allowed = true;
        VendorOrder = order[i];
        break;
      }
    }
    if (!allowed) {
      return res
        .status(401)
        .json({ message: "You are not authorized to update this order" });
    }

    if (VendorOrder.progress < 5) {
      VendorOrder.progress = VendorOrder.progress + 1;
    } else {
      VendorOrder.status = "completed";
      const vendor = await Vendor.findById(vendorId);
      vendor.available = true;
      const order_ = await Order.findById(orderId);
      order.length >= VendorOrder.totalGates
        ? (order_.currentStatus = "completed")
        : (order_.currentStatus = "pending");
      await vendor.save();
      await order_.save();
      return res.status(400).json({ message: "Order already completed" });
    }

    await VendorOrder.save();
    res.status(200).json({ message: "Progress Updated" });
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
