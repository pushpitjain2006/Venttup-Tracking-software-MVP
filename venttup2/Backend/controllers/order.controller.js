import Order from "../database/models/order.model.js";

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
    const id=req.body.orderId || req.params.orderID;

    if (!id) {
      return res.status(400).json({ message: "Please provide orderId" });
    }
    const order = await Order.findById(id);
    if (
      LoggedInUserType === "customer" &&
      order.customerId !== req.body.customerId
    ) {
      return res
        .status(400)
        .json({ message: "You are not authorized to view this order" });
    } else if (
      LoggedInUserType === "vendor" &&
      order.vendorId !== req.body.vendorId
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
    await order.save();
    res.status(200).json({ message: "GRN confirmed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};