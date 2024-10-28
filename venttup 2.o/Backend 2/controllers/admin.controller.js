import Admin from "../database/models/admin.model.js";
import Order from "../database/models/order.model.js";
import OrderStatus from "../database/models/order_status.model.js";
import Vendor from "../database/models/vendor.model.js";
import Customer from "../database/models/customer.model.js";
import generateTokenAndSetCookie from "../utils/GenerateJWT.js";
import bcrypt from "bcryptjs";

export const LoginAdmin = async (req, res) => {
  console.log("Trying to login admin");
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);

    if (isMatch) {
      const { token, LoggedInUserType, userID } = generateTokenAndSetCookie(
        admin._id,
        "admin",
        res
      );

      return res.status(200).json({ token, LoggedInUserType, userID });
    }
    res.status(400).json({ message: "Invalid Credentials" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const LogoutAdmin = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "Development",
    });
    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const SignupAdmin = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;
    if (!username || !password || !confirmPassword) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const admin = await Admin.findOne({ username });
    if (admin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });
    await newAdmin.save();
    res.status(200).json({ message: "Admin Created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const GetOrdersWithPendingAssignment = async (req, res) => {
  try {
    const orders = await Order.find({ currentStatus: "pending" });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const ApproveOrders = async (req, res) => {
  try {
    const { orderID } = req.body;
    if (!orderID) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const order = await Order.findById(orderID);
    order.currentStatus = "in-progress";
    await order.save();

    res.status(200).json({ message: "Orders Approved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const GetAvailableVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({ available: true });
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const AssignVendors = async (req, res) => {
  try {
    const { orderId, vendorId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }

    const { orderType } = order;
    const STATUS = await OrderStatus.find({ orderId });

    let totalGates;
    const gateLimit = {
      localization: 8,
      contract_manufacturing: 1,
      supply_chain: 1,
    };

    // Check if all gates are already assigned for the order type
    if (STATUS.length >= gateLimit[orderType]) {
      return res
        .status(400)
        .json({ message: "All gates are already assigned" });
    }
    totalGates = gateLimit[orderType];

    // Vendor selection: if vendorId is provided, use it; otherwise, find a free vendor
    let vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      const freeVendors = await Vendor.findOneAndUpdate(
        { available: true },
        { available: false }
      );
      if (!freeVendors) {
        return res.status(400).json({ message: "No free vendors available" });
      }
      vendor = freeVendors;
    } else {
      vendor.available = false;
      await vendor.save();
    }

    // Create and save the new OrderStatus
    const orderStatus = new OrderStatus({
      orderId,
      gateNumber: STATUS.length + 1, // Ensure this logic works as intended
      vendorId: vendor._id,
      totalGates,
    });
    await orderStatus.save();

    res.status(200).json({ message: "Vendor Assigned", vendorId: vendor._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const ViewUsers = async (req, res) => {
  try {
    let type = req.query.type;
    if (!type) {
      type = req.body.type;
    }
    if (type === "vendor") {
      const users = await Vendor.find();
      return res.status(200).json(users);
    } else if (type === "customer") {
      const users = await Customer.find();
      return res.status(200).json(users);
    }
    return res.status(400).json({ message: "Please provide type" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUsers= async(req, res)=>{
  try {
    const { type, id } = req.body;
    if (!type || !id) {
      return res.status(400).json({ message: "User type and ID are required" });
    }

    let userModel;
    if (type === "vendor") {
      userModel = Vendor; 
    } else if (type === "customer") {
      userModel = Customer; 
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
