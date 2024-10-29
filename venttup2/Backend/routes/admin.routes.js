import express from "express";
import {
  LoginAdmin,
  LogoutAdmin,
  // ApproveOrders,
  // GetAvailableVendors,
  AssignVendors,
  ViewUsers,
  SignupAdmin,
  deleteUsers,
  orderUpload,
} from "../controllers/admin.controller.js";
// import { ViewOrders, TrackOrders } from "../controllers/order.controller.js";
import {
  OrderDetails,
  ViewAllOrders,
} from "../controllers/order.controller.js";
import protectedRoute from "../middlewares/ProtectedRoute.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/login", LoginAdmin); //Working
router.get("/logout", protectedRoute, isAdmin, LogoutAdmin); //Working
router.post("/signup", SignupAdmin);
// router.post("/approve-orders",protectedRoute,isAdmin, ApproveOrders);  //Working
// router.get("/get-available-vendors",protectedRoute,isAdmin, GetAvailableVendors); //Working
router.post("/assign-vendors", protectedRoute, isAdmin, AssignVendors); //Working
router.get("/view-users", protectedRoute, isAdmin, ViewUsers); //Working
router.get("/view-orders", protectedRoute, isAdmin, ViewAllOrders); //Working (jo jo route comment hai unhe dekhna hai backend crash karra hai inhe uncomment karne par..)
// router.get("/track-orders",protectedRoute,isAdmin, TrackOrders);  //Working
router.delete("/delete-user", protectedRoute, isAdmin, deleteUsers);
router.post("/upload-order", protectedRoute, isAdmin, orderUpload);
router.get("/order/:orderID", protectedRoute, isAdmin, OrderDetails);

export default router;
