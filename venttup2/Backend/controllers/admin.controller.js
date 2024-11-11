import Admin from "../database/models/admin.model.js";
import Order from "../database/models/order.model.js";
import Vendor from "../database/models/vendor.model.js";
import Customer from "../database/models/customer.model.js";
import generateTokenAndSetCookie from "../utils/GenerateJWT.js";
import bcrypt from "bcryptjs";
import orderStatuses from "../config/orderStatusConfig.js";
import multer from "multer";
import uploadToCloudinary, {
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import fs from "fs";
import path from "path";

export const LoginAdmin = async (req, res) => {
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
    const { orderId, vendorGSTIN } = req.body;

    if (!orderId || !vendorGSTIN) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.currentStatus !== "Vendor Selection") {
      return res
        .status(400)
        .json({ message: "Order is not in vendor selection stage" });
    }

    const vendor = await Vendor.findOne({ GSTIN: vendorGSTIN });
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    if (!vendor.available) {
      return res
        .status(400)
        .json({ message: "Vendor is currently not available" });
    }

    order.vendorId = vendor._id;
    order.currentStatus = "Vendor Assigned";
    order.currentStep = order.currentStep + 1;
    order.CustomerSeen = false;
    order.VendorSeen = false;
    await order.save();
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

export const UpdateUsers = async (req, res) => {
  try {
    const { type, id, data } = req.body;
    if (!type || !id || !data) {
      return res.status(400).json({ message: "Please fill all the fields" });
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

    for (const key in data) {
      user[key] = data[key];
    }

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
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
    const { customerGstin, orderType, totalAmount, sector, comments } =
      req.body.data;
    // console.log(req.body.data);
    if (!customerGstin || !orderType || !totalAmount || !sector) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const customer = await Customer.findOne({ GSTIN: customerGstin });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    }
    const newOrder = new Order({
      customerId: customer._id,
      orderType,
      totalAmount,
      currentStatus: "Vendor Selection",
      sector,
      comments,
    });
    newOrder.AdminSeen = true;
    newOrder.CustomerSeen = false;
    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order uploaded successfully", orderId: newOrder._id });
  } catch (error) {
    console.error("Error uploading order:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const ApproveUpdate = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const arr = orderStatuses[order.orderType];
    order.currentStatus = arr[order.currentStep];
    order.adminApproval = true;
    order.CustomerSeen = false;
    order.VendorSeen = false;
    await order.save();
    res.status(200).json({ message: "Progress Approved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const DisapproveUpdate = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.currentStep -= 1;
    order.currentStatus = orderStatuses[order.orderType][order.currentStep];
    order.adminApproval = true;
    order.CustomerSeen = false;
    order.VendorSeen = false;
    await order.save();
    res.status(200).json({ message: "Progress Disapproved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("public/uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export const fileUpload = (req, res) => {
  // console.log("fileUpload");
  // console.log(req);
  upload.single("file")(req, res, async (err) => {
    // console.log(req.body);
    const { orderId, documentName } = req.body;
    if (!orderId || orderId == "" || orderId == "undefined") {
      return res.status(400).json({ message: "Please provide orderId" });
    }
    if (err) {
      console.error("File upload failed - ", err);
      return res
        .status(500)
        .json({ message: "File upload failed", error: err });
    }
    if (!req.file) {
      console.error("File not found in the request");
      return res.status(400).json({ message: "No file uploaded" });
    }
    const order = await Order.findById(orderId);
    console.log(order);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    try {
      const result = await uploadToCloudinary(req.file.path);
      fs.unlinkSync(req.file.path);
      const doc = order.documents.find((doc) => {
        return documentName
          ? doc.name === documentName
          : doc.name === order.currentStatus;
      });
      // console.log(doc);
      if (doc) {
        await deleteFromCloudinary(doc.url);
        order.documents.find((doc) => {
          return documentName
            ? doc.name === documentName
            : doc.name === order.currentStatus;
        }).url = result.secure_url;
      } else {
        order.documents.push({
          name: documentName ?? order.currentStatus,
          url: result.secure_url,
        });
      }
      order.CustomerSeen = false;
      order.VendorSeen = false;
      await order.save();
      return res.status(200).json({
        message: "File uploaded successfully",
        file: req.file,
        cloudinaryUrl: result.secure_url,
      });
    } catch (cloudinaryError) {
      console.log(" cloudinaryError - ", cloudinaryError);
      return res
        .status(500)
        .json({ message: "Cloudinary upload failed", error: cloudinaryError });
    }
  });
};

export const UpdateProgressAdmin = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const arr = orderStatuses[order.orderType];
    const isLocalization = order.orderType === "localization";
    const isSupplyChain = order.orderType === "supply chain";
    const isContractManufacturing =
      order.orderType === "contract_manufacturing";
    if (!order.customerApproval) {
      return res
        .status(400)
        .json({ message: "Order waiting for customer approval" });
    }
    if (!order.vendorApproval) {
      return res
        .status(400)
        .json({ message: "Order waiting for vendor approval" });
    }
    if (order.currentStatus === "GRN") {
      return res
        .status(400)
        .json({ message: "Order waiting for customer approval" });
    }
    if (order.currentStatus === "Order completed") {
      order.currentStep = arr.length;
      order.save();
      return res.status(400).json({ message: "Order already completed" });
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
      order.currentStatus = arr[order.currentStep];
      order.adminApproval = true;
    } else {
      return res.status(400).json({ message: "Invalid request" });
    }
    order.CustomerSeen = false;
    order.VendorSeen = false;
    await order.save();
    return res.status(200).json({ message: "Progress Updated" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
