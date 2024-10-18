const isCustomer = (req, res, next) => {
  try {
    console.log(req.body);
    const LoggedInUserType = req.body.LoggedInUserType;
    if (LoggedInUserType !== "customer") {
      return res.status(401).json({ message: "Not authorized as a customer" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default isCustomer;
