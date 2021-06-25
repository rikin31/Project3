const { authJwt } = require("../middlewares");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  const employee = require("../controllers/employee.conroller");

  var router = require("express").Router();

  // Create a new Employee
  router.post("/", [authJwt.verifyToken, authJwt.isAdmin], employee.create);

  // Retrieve all Employees
  router.get("/", [authJwt.verifyToken, authJwt.isAdmin], employee.findAll);

  // Retrieve a single Employee with id
  router.get("/:id", [authJwt.verifyToken], employee.findOne);

  // Update a Employee with id
  router.put("/:id", [authJwt.verifyToken], employee.update);

  // Delete a Employee with id
  router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], employee.delete);

  // Delete all Employees
  router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], employee.deleteAll);

  app.use('/api/employee', router);
};
