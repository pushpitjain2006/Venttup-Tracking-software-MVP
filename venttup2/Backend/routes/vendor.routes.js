import express from "express";
import {
  LoginVendor,
  LogoutVendor,
  SignupVendor,
  AcceptOrders,
  DeclineOrders,
  GetVendorOrders,
  GetCustomerDetails,
  UpdateProgress,
} from "../controllers/vendor.controller.js";
import protectedRoute from "../middlewares/ProtectedRoute.js";
import isVendor from "../middlewares/isVendor.js";
import { OrderDetails } from "../controllers/order.controller.js";
import { fileUpload } from "../controllers/admin.controller.js";
const router = express.Router();

router.post("/login", LoginVendor);
router.get("/logout", LogoutVendor);
router.post("/signup", SignupVendor);
router.post("/accept-order", protectedRoute, isVendor, AcceptOrders);
router.post("/decline-order", protectedRoute, isVendor, DeclineOrders);
router.post("/update-progress", protectedRoute, isVendor, UpdateProgress);
router.post("/get-vendor-orders", protectedRoute, isVendor, GetVendorOrders);
router.get(
  "/get-customer-details",
  protectedRoute,
  isVendor,
  GetCustomerDetails
);
router.post("/view-order-details", protectedRoute, isVendor, OrderDetails);
router.post("/upload", protectedRoute, isVendor, fileUpload);

export default router;
