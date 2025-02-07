import express from "express";

import {
  LoginCustomer,
  LogoutCustomer,
  SignupCustomer,
  PlaceOrders,
  VendorDetails,
  ApproveGRN,
  ConfirmGate,
} from "../controllers/customer.controller.js";
import {
  approveUpdate,
  ClearNotification,
  editOrder,
  GetNotification,
  OrderDetails,
  ViewAllOrders,
} from "../controllers/order.controller.js";
import protectedRoute from "../middlewares/ProtectedRoute.js";
import isCustomer from "../middlewares/isCustomer.js";
import { fileUpload } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello Customer!");
});
router.post("/login", LoginCustomer);
router.get("/logout", LogoutCustomer);
router.post("/signup", SignupCustomer);
router.post("/place-orders", protectedRoute, isCustomer, PlaceOrders);
router.get("/view-orders", protectedRoute, isCustomer, ViewAllOrders);
router.post("/view-order-details", protectedRoute, isCustomer, OrderDetails);
router.get("/vendor-details", protectedRoute, isCustomer, VendorDetails);
router.post("/approve-grn", protectedRoute, isCustomer, ApproveGRN);
router.post("/editOrder", protectedRoute, isCustomer, editOrder);
router.post("/approve-order", protectedRoute, isCustomer, ConfirmGate);
router.post("/upload", protectedRoute, isCustomer, fileUpload);
router.get("/get-notification", protectedRoute, isCustomer, GetNotification);
router.get("/clear-notification", protectedRoute, isCustomer, ClearNotification);
router.post("/approve-update-Approval", protectedRoute, isCustomer, approveUpdate);
export default router;
