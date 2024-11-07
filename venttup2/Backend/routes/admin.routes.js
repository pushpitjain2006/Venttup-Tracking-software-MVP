import express from "express";
import {
  LoginAdmin,
  LogoutAdmin,
  SignupAdmin,
  GetAvailableVendors,
  AssignVendors,
  ViewUsers,
  UpdateUsers,
  deleteUsers,
  orderUpload,
  ApproveUpdate,
  fileUpload,
  UpdateProgressAdmin,
  DisapproveUpdate,
} from "../controllers/admin.controller.js";
import {
  deleteOrder,
  ViewAllOrders,
  ViewOrdersWithFilters,
  OrderDetails,
  editOrder,
  ConfirmGRN,
} from "../controllers/order.controller.js";

import protectedRoute from "../middlewares/ProtectedRoute.js";
import isAdmin from "../middlewares/isAdmin.js";
import { AcceptOrders } from "../controllers/vendor.controller.js";

const router = express.Router();

router.post("/login", LoginAdmin);
router.get("/logout", LogoutAdmin);
router.post("/signup", protectedRoute, isAdmin, SignupAdmin);
router.get(
  "/get-available-vendors",
  protectedRoute,
  isAdmin,
  GetAvailableVendors
);
router.post("/assign-vendor", protectedRoute, isAdmin, AssignVendors);
router.get("/view-users", protectedRoute, isAdmin, ViewUsers);
router.get("/view-orders", protectedRoute, isAdmin, ViewAllOrders);
router.delete("/delete-user", protectedRoute, isAdmin, deleteUsers);
router.put("/update-user", protectedRoute, isAdmin, UpdateUsers);
router.post("/upload-order", protectedRoute, isAdmin, orderUpload);
router.get("/order/:orderID", protectedRoute, isAdmin, OrderDetails);
router.delete("/delete-order", protectedRoute, isAdmin, deleteOrder);
router.put("/modify-order", protectedRoute, isAdmin, editOrder);
router.post("/approve-update", protectedRoute, isAdmin, ApproveUpdate);
router.post("/disapprove-update", protectedRoute, isAdmin, DisapproveUpdate);
router.post("/upload", protectedRoute, isAdmin, fileUpload);

router.post("/confirm-grn", protectedRoute, isAdmin, ConfirmGRN);
router.post("/vendor-accept-order", protectedRoute, isAdmin, AcceptOrders);
router.post("/update-progress", protectedRoute, isAdmin, UpdateProgressAdmin);
router.post(
  "/view-orders-with-filters",
  protectedRoute,
  isAdmin,
  ViewOrdersWithFilters
);
export default router;
