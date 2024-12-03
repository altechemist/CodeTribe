const protectAdmin = (req, res, next) => {
    // Check if the user has the 'admin' role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Forbidden, you are not an admin" });
    }
    next();
  };
  
  module.exports = { protectAdmin };
  