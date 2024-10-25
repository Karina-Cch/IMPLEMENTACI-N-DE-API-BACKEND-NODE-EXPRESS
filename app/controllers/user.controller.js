const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../../models');
const User = db.users;
const Bootcamp = db.bootcamps;

exports.createUser = async (req, res) => {
  const user = req.body;
  const hashedPassword = await bcrypt.hash(user.password, 8);
  User.create({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: hashedPassword
  })
  .then(newUser => res.send(newUser))
  .catch(err => res.status(500).send({ message: `Error al crear el usuario: ${err.message}` }));
};

exports.signIn = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) return res.status(404).send({ message: "Usuario no encontrado" });

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ accessToken: null, message: "Contraseña inválida" });

      const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
      res.status(200).send({ id: user.id, email: user.email, accessToken: token });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findUserById = (req, res) => {
  User.findByPk(req.params.id, {
    include: [{ model: Bootcamp, as: "bootcamps", attributes: ["id", "title"], through: { attributes: [] } }]
  })
  .then(user => res.send(user))
  .catch(err => res.status(500).send({ message: `Error al encontrar el usuario: ${err.message}` }));
};

exports.findAll = (req, res) => {
  User.findAll({
    include: [{ model: Bootcamp, as: "bootcamps", attributes: ["id", "title"], through: { attributes: [] } }]
  })
  .then(users => res.send(users))
  .catch(err => res.status(500).send({ message: `Error al buscar usuarios: ${err.message}` }));
};

exports.updateUserById = (req, res) => {
  User.update(
    { firstName: req.body.firstName, lastName: req.body.lastName },
    { where: { id: req.params.id } }
  )
  .then(() => res.send({ message: "Usuario actualizado correctamente" }))
  .catch(err => res.status(500).send({ message: `Error al actualizar el usuario: ${err.message}` }));
};

exports.deleteUserById = (req, res) => {
  User.destroy({ where: { id: req.params.id } })
  .then(() => res.send({ message: "Usuario eliminado correctamente" }))
  .catch(err => res.status(500).send({ message: `Error al eliminar el usuario: ${err.message}` }));
};
