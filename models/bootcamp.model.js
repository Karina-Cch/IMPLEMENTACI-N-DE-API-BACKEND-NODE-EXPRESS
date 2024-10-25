module.exports = (sequelize, DataTypes) => {
  const Bootcamp = sequelize.define("bootcamp", {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "El campo nombre (title) es requerido",
        },
      },
    },
    cue: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 5,
          msg: "El CUE debe ser mayor o igual a 5",
        },
        max: {
          args: 20,
          msg: "El CUE debe ser menor o igual a 20",
        },
        isInt: {
          args: true,
          msg: "Debes introducir un número entero",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Se debe introducir una descripción",
        },
      },
    },
  });

  return Bootcamp;
};
