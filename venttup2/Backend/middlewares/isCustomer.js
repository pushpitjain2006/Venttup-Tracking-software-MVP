const isCustomer = (req, res, next) => {
  try {
    const LoggedInUserType = req.body.LoggedInUserType;
    if (LoggedInUserType === "customer" || LoggedInUserType === "admin") {
      next();
    } else {
      return res.status(401).json({ message: "Not authorized as a customer" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default isCustomer;
