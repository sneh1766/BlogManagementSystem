const jwt = require("jsonwebtoken");

// ==========================
// Authentication Middleware
// ==========================
const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token, access denied",
    });
  }

  try {
    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// ==========================
// Role-Based Authorization
// ==========================
const authorize = (...roles) => {

  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {

      return res.status(403).json({
        success: false,
        message: "Access denied",
      });

    }

    next();

  };

};

module.exports = {
  protect,
  authorize,
};