const { verifyToken } = require("../middleware/auth.js");
const { checkDuplicateEmail } = require("../middleware/verifySignUp.js");
const userController = require("../controllers/user.controller.js");

module.exports = (app) => {
  app.post("/api/signup", checkDuplicateEmail, (req, res) => userController.createUser(req, res));
  app.post("/api/signin", (req, res) => userController.signIn(req, res));

  app.get("/api/user/:id", verifyToken, (req, res) => userController.findUserById(req, res));
  app.get("/api/user", verifyToken, (req, res) => userController.findAll(req, res));

  app.put("/api/user/:id", verifyToken, (req, res) => userController.updateUserById(req, res));
  app.delete("/api/user/:id", verifyToken, (req, res) => userController.deleteUserById(req, res));
};
