const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users");

// ruta para registro
router.post("/register", UserController.createUser);

//ruta para editar un usuario --> update
router.put("/:id", UserController.updateUser)

//ruta para login --> JWT lógica
router.post("/login", (req, res) => {
  const userLogged = req.user;
  res.send("estoy en ruta login");
});

//ruta para logout
router.post("/logout", (req, res) => {
  res.sendStatus(200);
});

//ruta para que devuelva el usuario loggeado en el caso que haya
router.get("/:id"); //JWT







module.exports = router;