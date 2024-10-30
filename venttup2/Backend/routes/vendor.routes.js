import express from "express";
import {
  LoginVendor,
  LogoutVendor,
  SignupVendor,
  AcceptOrders,
  DeclineOrders,
  UpdateProgress,
  GetVendorOrders,
  GetCustomerDetails,
} from "../controllers/vendor.controller.js";

// import { ViewOrders, TrackOrders } from "../controllers/order.controller.js";
import protectedRoute from "../middlewares/ProtectedRoute.js";
import isVendor from "../middlewares/isVendor.js";
import { OrderDetails } from "../controllers/order.controller.js";
const router = express.Router();

router.post("/login", LoginVendor); //Working
router.get("/logout", LogoutVendor); //Working
router.post("/signup", SignupVendor); //Working
// router.get("/view-orders", protectedRoute, isVendor, ViewOrders); //Working
router.post("/accept-order", protectedRoute, isVendor, AcceptOrders); //Working
router.post("/decline-order", protectedRoute, isVendor, DeclineOrders);
router.post("/update-progress", protectedRoute, isVendor, UpdateProgress); //Working
// router.get("/track-orders", protectedRoute, isVendor, TrackOrders);
router.post("/get-vendor-orders", protectedRoute, isVendor, GetVendorOrders);
router.get(
  "/get-customer-details",
  protectedRoute,
  isVendor,
  GetCustomerDetails
);
router.post("/view-order-details", protectedRoute, isVendor, OrderDetails);

export default router;
