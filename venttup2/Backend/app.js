import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./database/Connector.js";
import vendorRoutes from "./routes/vendor.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import isCustomer from "./middlewares/isCustomer.js";
import isAdmin from "./middlewares/isAdmin.js";
import isVendor from "./middlewares/isVendor.js";
import protectedRoute from "./middlewares/ProtectedRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/vendor", protectedRoute, isVendor, vendorRoutes);
app.use("/customer", protectedRoute, isCustomer, customerRoutes);
app.use("/admin", protectedRoute, isAdmin, adminRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  connectToDatabase();
  console.log(`Server is running on http://localhost:${port}`);
});
