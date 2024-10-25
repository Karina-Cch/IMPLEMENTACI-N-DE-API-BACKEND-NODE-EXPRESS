const db = require('../../models');
const Bootcamp = db.bootcamps;
const User = db.users;

exports.createBootcamp = (req, res) => {
  const bootcamp = req.body;
  Bootcamp.create({
    title: bootcamp.title,
    cue: bootcamp.cue,
    description: bootcamp.description
  })
  .then(newBootcamp => res.send(newBootcamp))
  .catch(err => res.status(500).send({ message: `Error al crear el bootcamp: ${err.message}` }));
};

exports.addUser = (req, res) => {
  const { bootcampId, userId } = req.body;
  Bootcamp.findByPk(bootcampId)
    .then(bootcamp => {
      if (!bootcamp) return res.status(404).send({ message: "No se encontró el Bootcamp!" });
      
      User.findByPk(userId).then(user => {
        if (!user) return res.status(404).send({ message: "Usuario no encontrado!" });
        
        bootcamp.addUser(user);
        res.send({ message: `Agregado el usuario id=${user.id} al bootcamp con id=${bootcamp.id}` });
      });
    })
    .catch(err => res.status(500).send({ message: `Error al agregar Usuario al Bootcamp: ${err.message}` }));
};

exports.findById = (req, res) => {
  Bootcamp.findByPk(req.params.id, {
    include: [{ model: User, as: "users", attributes: ["id", "firstName", "lastName"], through: { attributes: [] } }]
  })
  .then(bootcamp => res.send(bootcamp))
  .catch(err => res.status(500).send({ message: `Error al encontrar el bootcamp: ${err.message}` }));
};

exports.findAll = (req, res) => {
  Bootcamp.findAll({
    include: [{ model: User, as: "users", attributes: ["id", "firstName", "lastName"], through: { attributes: [] } }]
  })
  .then(bootcamps => res.send(bootcamps))
  .catch(err => res.status(500).send({ message: `Error al buscar bootcamps: ${err.message}` }));
};
