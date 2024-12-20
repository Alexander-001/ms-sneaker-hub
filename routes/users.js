const { Router } = require("express");
const {
  addUser,
  loginUser,
  getAllMechanic,
  getMechanicByEmail,
  updateMechanic,
  deleteMechanic,
} = require("../controllers/user");
const { check } = require("express-validator");

const router = Router();

const validationParams = [
  check("name", "Se debe ingresar usuario").not().isEmpty(),
  check("email", "Se debe ingresar email").not().isEmpty(),
  check("password", "Se debe ingresar contraseña").not().isEmpty(),
  check("email", "Formato de correo inválido.").isEmail(),
  check("password", "Contraseña debe ser mayor a 6 caracteres.").isLength(6),
];

const validationParamsLogin = [
  check("email", "Se debe ingresar email").not().isEmpty(),
  check("password", "Se debe ingresar contraseña").not().isEmpty(),
  check("email", "Formato de correo inválido.").isEmail(),
  check("password", "Contraseña debe ser mayor a 6 caracteres.").isLength(6),
];

//* Post: Ingresar
router.post("/add", validationParams, addUser);
router.post("/login", validationParamsLogin, loginUser);

//* Get: Obtener
router.get("/getAll", getAllMechanic);
router.get("/getMechanic/:email", getMechanicByEmail);

//* Patch: Modificar
router.patch("/update", validationParams, updateMechanic);

//* Delete: Eliminar
router.delete("/delete/:email", deleteMechanic);

module.exports = router;
