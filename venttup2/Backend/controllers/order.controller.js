import Order from "../database/models/order.model.js";

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully", orderId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const ViewAllOrders = async (req, res) => {
  try {
    const { LoggedInUserType } = req.body;
    if (LoggedInUserType === "customer") {
      const orders = await Order.find({ customerId: req.body.customerId });
      res.status(200).json(orders);
    } else if (LoggedInUserType === "vendor") {
      const orders = await Order.find({ vendorId: req.body.vendorId });
      res.status(200).json(orders);
    } else if (LoggedInUserType === "admin") {
      const orders = await Order.find();
      res.status(200).json(orders);
    } else {
      return res
        .status(400)
        .json({ message: "Please provide LoggedInUserType" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const OrderDetails = async (req, res) => {
  try {
    const { LoggedInUserType } = req.body;
    const id = req.body.orderId || req.params.orderID;

    if (!id) {
      return res.status(400).json({ message: "Please provide orderId" });
    }
    const order = await Order.findById(id);
    if (
      LoggedInUserType === "customer" &&
      order.customerId != req.body.customerId
    ) {
      return res.status(400).json({
        message: "You are not authorized to view this order",
        order,
        LoggedInUserType,
      });
    } else if (
      LoggedInUserType === "vendor" &&
      order.vendorId != req.body.vendorId
    ) {
      return res
        .status(400)
        .json({ message: "You are not authorized to view this order" });
    }
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const ViewOrdersWithFilters = async (req, res) => {
  try {
    const { LoggedInUserType } = req.body;
    const { filter } = req.body;
    if (LoggedInUserType === "customer") {
      const orders = await Order.find({
        customerId: req.body.customerId,
        ...filter,
      });
      res.status(200).json(orders);
    }
    if (LoggedInUserType === "vendor") {
      const orders = await Order.find({
        vendorId: req.body.vendorId,
        ...filter,
      });
      res.status(200).json(orders);
    }
    if (LoggedInUserType === "admin") {
      const orders = await Order.find({ ...filter });
      res.status(200).json(orders);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const ConfirmGRN = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: "Please provide orderId" });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }
    if (order.currentStatus !== "GRN" && order.currentStatus !== "Gate 7") {
      return res
        .status(400)
        .json({ message: "Order is not in Goods Received status" });
    }
    order.currentStep += 1;
    order.currentStatus = "Order completed";
    order.AdminSeen = false;
    order.CustomerSeen = false;
    await order.save();
    res.status(200).json({ message: "GRN confirmed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editOrder = async (req, res) => {
  try {
    const { orderId, updates, LoggedInUserType } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: "Please provide orderId" });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }
    if (!updates) {
      return res.status(200).json({ message: "No updates provided" });
    }
    if (LoggedInUserType === "customer") {
      if (order.customerId != req.body.customerId) {
        return res
          .status(400)
          .json({ message: "Only Customer can update the order." });
      }
      if (order.currentStep > 0) {
        return res
          .status(400)
          .json({ message: "Only Admin can update the order." });
      }
    }
    if (LoggedInUserType === "vendor") {
      return res
        .status(400)
        .json({ message: "Only Admin can update the order." });
    }
    Object.assign(order, updates);
    order.VendorSeen = false;
    order.CustomerSeen = false;
    await order.save();
    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const GetNotification = async (req, res) => {
  try {
    const { LoggedInUserType } = req.body;
    if (LoggedInUserType === "customer") {
      const notifications = await Order.find({
        customerId: req.body.customerId,
        CustomerSeen: false,
      });
      console.log(notifications);
      res.status(200).json(notifications);
    }
    if (LoggedInUserType === "vendor") {
      const notifications = await Order.find({
        vendorId: req.body.vendorId,
        VendorSeen: false,
      });
      console.log(notifications);
      res.status(200).json(notifications);
    }
    if (LoggedInUserType === "admin") {
      const notifications = await Order.find({
        AdminSeen: false,
      });
      console.log(notifications);
      res.status(200).json(notifications);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const ClearNotification = async (req, res) => {
  try {
    const { LoggedInUserType } = req.body;
    console.log(req.body);
    console.log(LoggedInUserType);
    if (LoggedInUserType === "customer") {
      const notifications = await Order.find({
        customerId: req.body.customerId,
        CustomerSeen: false,
      });
      notifications.forEach(async (notification) => {
        notification.CustomerSeen = true;
        await notification.save();
      });
      res.status(200).json({ message: "Notifications cleared" });
    }
    if (LoggedInUserType === "vendor") {
      const orders = await Order.find({
        vendorId: req.body.vendorId,
        VendorSeen: false,
      });
      orders.forEach(async (order) => {
        order.VendorSeen = true;
        await order.save();
      });
      res.status(200).json({ message: "Notifications cleared" });
    }
    if (LoggedInUserType === "admin") {
      const orders = await Order.find({
        AdminSeen: false,
      });
      orders.forEach(async (order) => {
        order.AdminSeen = true;
        await order.save();
      });
      res.status(200).json({ message: "Notifications cleared" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveUpdate = async (req, res) => {
  try {
    const { orderId, LoggedInUserType } = req.body;
    console.log(req.body);
    if (!orderId) {
      return res.status(400).json({ message: "Please provide orderId" });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }
    if (LoggedInUserType === "customer") {
      order.customerApproval = true;
      order.save();
      return res.status(200).json({ message: "Customer approved the changes" });
    }
    if (LoggedInUserType === "vendor") {
      order.vendorApproval = true;
      order.save();
      return res.status(200).json({ message: "Vendor approved the changes" });
    }
    if (LoggedInUserType === "admin") {
      order.adminApproval = true;
      order.save();
      return res.status(200).json({ message: "Admin approved the changes" });
    }
    return res.status(400).json({ message: "Invalid user type" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
