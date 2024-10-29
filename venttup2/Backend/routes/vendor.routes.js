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
// import protectedRoute from "../middlewares/ProtectedRoute.js";
// import isVendor from "../middlewares/isVendor.js";
const router = express.Router();

router.post("/login", LoginVendor); //Working
router.get("/logout", LogoutVendor); //Working
router.post("/signup", SignupVendor); //Working
// router.get("/view-orders", protectedRoute, isVendor, ViewOrders); //Working
router.post("/accept-orders", AcceptOrders); //Working
router.post("/decline-orders", DeclineOrders);
router.post("/update-progress", UpdateProgress); //Working
// router.get("/track-orders", protectedRoute, isVendor, TrackOrders);
router.get("/get-vendor-orders", GetVendorOrders);
router.get("/get-customer-details", GetCustomerDetails);

export default router;
