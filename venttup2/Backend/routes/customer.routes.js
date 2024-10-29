import express from "express";

import {
  LoginCustomer,
  LogoutCustomer,
  SignupCustomer,
  // PlaceOrders,
  // PaymentOrder,
  VendorDetails,
} from "../controllers/customer.controller.js";
import { ViewAllOrders } from "../controllers/order.controller.js";
import protectedRoute from "../middlewares/ProtectedRoute.js";
import isCustomer from "../middlewares/isCustomer.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello Customer!");
});
router.post("/login", LoginCustomer); //Working
router.get("/logout", LogoutCustomer); //Working
router.post("/signup", SignupCustomer); //Working
// router.post("/place-orders", protectedRoute, isCustomer, PlaceOrders); // working
// router.post("/payment-order", protectedRoute, isCustomer, PaymentOrder); //working
// router.get("/track-orders", protectedRoute, isCustomer, TrackOrders); //working
router.get("/view-orders", protectedRoute, isCustomer, ViewAllOrders); //working
// router.get("/view-order-details", protectedRoute, isCustomer, ViewOrderDetails); //working
router.get("/vendor-details", protectedRoute, isCustomer, VendorDetails); //working

export default router;
