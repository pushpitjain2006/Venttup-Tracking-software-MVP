import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userID, LoggedInUserType, res) => {
  const token = jwt.sign({ userID, LoggedInUserType }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, 
    httpOnly: true, 
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "Development",
  });
  return { token, LoggedInUserType, userID };
};

export default generateTokenAndSetCookie;
