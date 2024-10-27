import express from "express";
import {
  LoginAdmin,
  LogoutAdmin,
  ApproveOrders,
  GetAvailableVendors,
  AssignVendors,
  ViewUsers,
  SignupAdmin
} from "../controllers/admin.controller.js";
import { ViewOrders, TrackOrders } from "../controllers/order.controller.js";
import protectedRoute from "../middlewares/ProtectedRoute.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/login", LoginAdmin); //Working
router.get("/logout",protectedRoute,isAdmin, LogoutAdmin); //Working
router.post("/signup", SignupAdmin);
router.post("/approve-orders",protectedRoute,isAdmin, ApproveOrders);  //Working
router.get("/get-available-vendors",protectedRoute,isAdmin, GetAvailableVendors); //Working
router.post("/assign-vendors",protectedRoute,isAdmin, AssignVendors); //Working
router.get("/view-users",protectedRoute,isAdmin, ViewUsers); //Working
router.get("/view-orders",protectedRoute,isAdmin, ViewOrders); //Working
router.get("/track-orders",protectedRoute,isAdmin, TrackOrders);  //Working

export default router;
