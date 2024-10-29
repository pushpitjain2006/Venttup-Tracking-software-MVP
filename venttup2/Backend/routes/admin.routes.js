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
import { ViewAllOrders } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/login", LoginAdmin); //Working
router.get("/logout", LogoutAdmin); //Working
router.post("/signup", SignupAdmin);
// router.post("/approve-orders",protectedRoute,isAdmin, ApproveOrders);  //Working
// router.get("/get-available-vendors",protectedRoute,isAdmin, GetAvailableVendors); //Working
router.post("/assign-vendors", AssignVendors); //Working
router.get("/view-users", ViewUsers); //Working
router.get("/view-orders",ViewAllOrders); //Working (jo jo route comment hai unhe dekhna hai backend crash karra hai inhe uncomment karne par..)
// router.get("/track-orders",protectedRoute,isAdmin, TrackOrders);  //Working
router.delete("/delete-user", deleteUsers);
router.post("/upload-order",  orderUpload);

export default router;
