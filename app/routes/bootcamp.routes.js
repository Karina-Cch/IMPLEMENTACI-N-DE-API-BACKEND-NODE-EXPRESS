const { verifyToken } = require("../middleware/auth.js");
const bootcampController = require("../controllers/bootcamp.controller.js");

module.exports = (app) => {
  app.post("/api/bootcamp", verifyToken, (req, res) => bootcampController.createBootcamp(req, res));
  app.post("/api/bootcamp/adduser", verifyToken, (req, res) => bootcampController.addUser(req, res));

  app.get("/api/bootcamp/:id", verifyToken, (req, res) => bootcampController.findById(req, res));
  app.get("/api/bootcamp", (req, res) => bootcampController.findAll(req, res));
};
