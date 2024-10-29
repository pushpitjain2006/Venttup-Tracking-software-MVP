const isAdmin = (req, res, next) => {
  // console.log(req);
  if (req.body.LoggedInUserType !== 'admin') {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  console.log('isAdmin');
  next();
};

export default isAdmin;
