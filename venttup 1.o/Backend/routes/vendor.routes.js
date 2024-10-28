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

import { ViewOrders, TrackOrders } from "../controllers/order.controller.js";
import protectedRoute from "../middlewares/ProtectedRoute.js";
import isVendor from "../middlewares/isVendor.js";
const router = express.Router();

router.post("/login", LoginVendor); //Working
router.get("/logout", LogoutVendor); //Working
router.post("/signup", SignupVendor); //Working
router.get("/view-orders", protectedRoute, isVendor, ViewOrders); //Working
router.post("/accept-orders", protectedRoute, isVendor, AcceptOrders);  //Working
router.post("/decline-orders", protectedRoute, isVendor, DeclineOrders);
router.post("/update-progress", protectedRoute, isVendor, UpdateProgress);  //Working
router.get("/track-orders", protectedRoute, isVendor, TrackOrders);
router.get("/get-vendor-orders", protectedRoute, isVendor, GetVendorOrders);
router.get(
  "/get-customer-details",
  protectedRoute,
  isVendor,
  GetCustomerDetails
);

export default router;
