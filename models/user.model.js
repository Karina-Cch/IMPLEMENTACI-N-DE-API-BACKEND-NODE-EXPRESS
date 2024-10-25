module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "El campo del nombre es requerido",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "El campo del apellido es requerido",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Correo electrónico actualmente registrado en la base de datos",
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "El correo electrónico es requerido",
        },
        isEmail: {
          args: true,
          msg: "Formato de correo inválido",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "La contraseña es requerida",
        },
        len: {
          args: [8],
          msg: "La contraseña debe tener al menos 8 caracteres",
        },
      },
    },
  });

  return User;
};
