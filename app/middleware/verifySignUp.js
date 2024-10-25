const db = require("../../models");
const User = db.users;

const checkDuplicateEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) return res.status(400).send({ message: "Este correo ya está en uso" });
    next();
  } catch (error) {
    res.status(500).send({ message: "Error al consultar el correo electrónico" });
  }
};

module.exports = { checkDuplicateEmail };
