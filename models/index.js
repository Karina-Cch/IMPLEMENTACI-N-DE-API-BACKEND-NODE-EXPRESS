const dbConfig = require('../app/config/db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model')(sequelize, Sequelize);
db.bootcamps = require('./bootcamp.model')(sequelize, Sequelize);

//relación muchos a muchos entre usuarios y bootcamps
db.users.belongsToMany(db.bootcamps, {
  through: "user_bootcamp",
  as: "bootcamps",
  foreignKey: "user_id",
});
db.bootcamps.belongsToMany(db.users, {
  through: "user_bootcamp",
  as: "users",
  foreignKey: "bootcamp_id",
});

module.exports = db;
