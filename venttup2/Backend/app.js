import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./database/Connector.js";
import vendorRoutes from "./routes/vendor.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/vendor", vendorRoutes);
app.use("/customer", customerRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  connectToDatabase();
  console.log(`Server is running on http://localhost:${port}`);
});
