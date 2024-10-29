const isVendor = (req, res, next) => {
  try {
    const LoggedInUserType = req.body.LoggedInUserType;
    if (LoggedInUserType === "vendor" || LoggedInUserType === "admin") {
      console.log(`isVendor: ${LoggedInUserType}`);
      next();
    } else {
      return res.status(401).json({ message: "Not authorized as a vendor" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default isVendor;
