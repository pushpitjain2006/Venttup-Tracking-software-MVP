import express from "express";

import {
  LoginCustomer,
  LogoutCustomer,
  SignupCustomer,
  PlaceOrders,
  // PaymentOrder,
  VendorDetails,
} from "../controllers/customer.controller.js";
import { OrderDetails, ViewAllOrders } from "../controllers/order.controller.js";
import protectedRoute from "../middlewares/ProtectedRoute.js";
import isCustomer from "../middlewares/isCustomer.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello Customer!");
});
router.post("/login", LoginCustomer); //Working
router.get("/logout", LogoutCustomer); //Working
router.post("/signup", SignupCustomer); //Working
router.post("/place-orders",protectedRoute, isCustomer, PlaceOrders); 
// router.post("/payment-order", protectedRoute, isCustomer, PaymentOrder); //working
// router.get("/track-orders", protectedRoute, isCustomer, TrackOrders); //working
router.get("/view-orders",protectedRoute, isCustomer, ViewAllOrders); //working
router.post("/view-order-details", protectedRoute, isCustomer, OrderDetails); //working
router.get("/vendor-details",protectedRoute, isCustomer, VendorDetails); //working

export default router;
