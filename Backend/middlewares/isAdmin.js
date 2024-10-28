const isAdmin = (req, res, next) => {
  // console.log(req);
  if (req.body.LoggedInUserType !== 'admin') {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

export default isAdmin;