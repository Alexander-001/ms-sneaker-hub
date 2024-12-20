const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const addUser = async (request, response) => {
  try {
    //* Validar parametros de entrada: name, email, password
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(200).json({ errors: errors.array() });
    }
    //* Si no hay errores de parametro de entrada, valida si existe usuario
    const { email, password } = request.body;
    let user = await User.findOne({ email });
    if (user) {
      return response.status(200).json({
        message: "Usuario ya existe",
        user: null,
      });
    }
    user = new User(request.body);
    //* Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    //* Si no hay errores y no existe usuario, crear nuevo usuario
    await user.save();
    return response.status(200).json({
      message: "Usuario creado correctamente",
      user,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Hubo un error al ingresar usuario",
      user: null,
    });
  }
};

const loginUser = async (request, response) => {
  try {
    //* Validar parametros de entrada: name, email, password
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(200).json({ errors: errors.array() });
    }
    const { email, password } = request.body;
    let user = await User.findOne({ email });
    if (!user) {
      return response.json({
        message: "El cliente no existe.",
        token: null,
      });
    }
    const successPassword = await bcrypt.compareSync(password, user.password);
    if (!successPassword) {
      return response.json({
        message: "La contraseña es incorrecta.",
        token: null,
      });
    }
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        username: user.name,
      },
    };
    jwt.sign(
      payload,
      "lkasjdl213uoij_1asñklDLlañ1",
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;
        return response.status(200).json({
          token,
          message: "Login exitoso",
        });
      }
    );
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Hubo un error al iniciar sesion",
      token: null,
    });
  }
};

const getAllMechanic = async (_, response) => {
  /* try {
    const mechanics = await Mechanic.find();
    response.status(200).json({
      message: "Usuarios encontrados",
      mechanics,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Hubo un error al obtener usuarios",
      mechanics: [],
    });
  } */
};

const getMechanicByEmail = async (request, response) => {
  /* try {
    const mechanic = await Mechanic.findOne({ email: request.params.email });
    response.status(200).json({
      message: "Usuario encontrado",
      mechanic,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Hubo un error al obtener usuario",
      mechanics: {},
    });
  } */
};

const updateMechanic = async (request, response) => {
  /*  try {
    //* Validar parametros de entrada: name, email, password
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(200).json({ errors: errors.array(), error: true });
    }
    const { email, name, password } = request.body;
    let mechanic = await Mechanic.findOne({ email });
    if (!mechanic) {
      return response.status(200).json({
        message: "Usuario no existe",
        mechanic: {},
      });
    }
    //* Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    mechanic.password = await bcrypt.hash(password, salt);
    mechanic.name = name;
    await mechanic.save();
    response.status(200).json({
      message: "Usuario actualizado",
      mechanic,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Hubo un error al modificar usuario",
      mechanics: {},
    });
  } */
};

const deleteMechanic = async (request, response) => {
  /* try {
    const { email } = request.params;
    let mechanic = await Mechanic.findOne({ email });
    if (!mechanic) {
      return response.status(200).json({
        message: "Usuario no existe",
        mechanic: {},
      });
    }
    await Mechanic.deleteOne({ email });
    response.status(200).json({
      message: "Usuario eliminado correctamente",
      mechanics: {},
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Hubo un error al eliminar usuario",
      mechanics: {},
    });
  } */
};

module.exports = {
  addUser,
  loginUser,
  getAllMechanic,
  getMechanicByEmail,
  updateMechanic,
  deleteMechanic,
};
