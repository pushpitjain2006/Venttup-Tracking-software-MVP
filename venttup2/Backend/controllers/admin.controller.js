import Admin from "../database/models/admin.model.js";
import Order from "../database/models/order.model.js";
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
    if (!orderId || !vendorId) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    order.vendorId = vendorId;
    order.currentStatus = "Vendor Assigned";
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

export const deleteUsers = async (req, res) => {
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
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const orderUpload = async (req, res) => {
  try {
    const { customerGstin, orderType, amount, sector } = req.body.data;
    if (!customerGstin || !orderType || !amount || !sector) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const customer = await Customer.findOne({ GSTIN: customerGstin });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    }
    const newOrder = new Order({
      customerId: customer._id,
      orderType,
      totalAmount: amount,
      currentStatus: "Vendor Selection",
      sector,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order uploaded successfully", order: newOrder });
  } catch (error) {
    console.error("Error uploading order:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
