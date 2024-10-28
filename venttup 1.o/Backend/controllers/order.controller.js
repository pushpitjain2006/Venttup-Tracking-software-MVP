import Order from "../database/models/order.model.js";
import OrderStatus from "../database/models/order_status.model.js";

export const TrackOrders = async (req, res) => {
  try {
    const { LoggedInUserType, orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: "Please provide orderId" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (
      LoggedInUserType === "customer" &&
      order.customerId !== req.body.CustomerId
    ) {
      return res
        .status(401)
        .json({ message: "You are not authorized to view this order" });
    }

    const orderStatus = await OrderStatus.find({ orderId });

    if (
      LoggedInUserType === "vendor" &&
      orderStatus.vendorId !== req.body.VendorId
    ) {
      return res
        .status(401)
        .json({ message: "You are not authorized to view this order" });
    }

    if (!orderStatus) {
      return res.status(404).json({ message: "Order status not found" });
    }

    const len = orderStatus.length;
    const progress = orderStatus.progress;

    res.status(200).json({ len, progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const ViewOrders = async (req, res) => {
  try {
    const { LoggedInUserType } = req.body;
    if (!LoggedInUserType) {
      return res
        .status(400)
        .json({ message: "Please provide LoggedInUserType" });
    } else if (LoggedInUserType === "admin") {
      const { filters } = req.body;
      const orders = await Order.find({ ...filters });
      res.status(200).json(orders);
    } else if (LoggedInUserType === "customer") {
      console.log("Inside customer orders");
      const { customerId } = req.body;
      if (!customerId) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }
      const orders = await Order.find({ customerId });
      console.log(orders);
      res.status(200).json(orders);
    } else if (LoggedInUserType === "vendor") {
      const { vendorId } = req.body;
      if (!vendorId) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }
      const ordersStatus = await OrderStatus.find({ vendorId });
      const orders = [];
      for (let i = 0; i < ordersStatus.length; i++) {
        const order = await Order.findById(ordersStatus[i].orderId);
        orders.push(order);
      }
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

export const ViewOrderDetails = async (req, res) => {
  try {
    // console.log(req.body);
    const { LoggedInUserType, orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: "Please provide orderId" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (LoggedInUserType === "customer") {
      if (order.customerId !== req.body.customerId) {
        return res
          .status(401)
          .json({ message: "You are not authorized to view this order" });
      }

      const orderStatus = await OrderStatus.find({ orderId });
      res.status(200).json({ order, orderStatus });
    } else if (LoggedInUserType === "vendor") {
      const orderStatus = await OrderStatus.find({
        orderId,
        vendorId: req.body.VendorId,
      });
      if (!orderStatus) {
        return res
          .status(404)
          .json({ message: "You are not authorized to view this order" });
      }
      res.status(200).json({ order, orderStatus });
    } else if (LoggedInUserType === "admin") {
      const orderStatus = await OrderStatus.find({ orderId });
      res.status(200).json({ order, orderStatus });
    } else {
      return res
        .status(400)
        .json({ message: "Please provide LoggedInUserType" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
