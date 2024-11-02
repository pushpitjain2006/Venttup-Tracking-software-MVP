import Customer from "../database/models/customer.model.js";
import Admin from "../database/models/admin.model.js";
import Vendor from "../database/models/vendor.model.js";
import jwt from "jsonwebtoken";

const protectedRoute = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const token=auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const LoggedInUserType = decoded.LoggedInUserType;
    if (LoggedInUserType == "customer") {
      const customerId = decoded.userID;

      const customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      req.body = {
        ...req.body,
        customerId,
        LoggedInUserType,
      };
    } else if (LoggedInUserType == "vendor") {
      const vendorId = decoded.userID;

      const vendor = await Vendor.findById(vendorId);
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }

      req.body = {
        ...req.body,
        vendorId,
        LoggedInUserType,
      };
    } else if (LoggedInUserType == "admin") {
      const AdminId = decoded.userID;

      const admin = await Admin.findById(AdminId);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      req.body = {
        ...req.body,
        AdminId: decoded.userID,
        LoggedInUserType,
      };
    } else {
      return res.status(401).json({ message: "Invalid LoggedInUserType" });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export default protectedRoute;
