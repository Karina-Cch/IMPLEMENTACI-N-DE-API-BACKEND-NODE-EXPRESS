require('dotenv').config();
const express = require("express");
const db = require('./models');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

//rutas importadas
require('./app/routes/user.routes')(app);
require('./app/routes/bootcamp.routes')(app);

//sicronizacion con la base de dato
db.sequelize.sync({ force: true }).then(() => {
  console.log("Base de datos sincronizada.");
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});
