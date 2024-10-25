const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  
  if (!token) {
    return res.status(403).send({ message: "Token de acceso no proporcionado." });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "No autorizado." });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = { verifyToken };
