const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json("Unauthorized: No token provided");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json("Unauthorized: Invalid token format");
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json("Forbidden: Invalid token");
    }
    req.user = user;
    next();
  });
}

module.exports = verify;
