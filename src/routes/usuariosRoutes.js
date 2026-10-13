const express = require("express");
const verificarToken = require("../middlewares/authMiddlewares");
const {
	obtenerUsuarios,
	obtenerUsuarioConHistorial,
	actualizarUsuario,
	eliminarUsuario,
	crearUsuarioConHistorial,
	obtenerMiPerfil,
} = require("../controllers/usuariosController");

const router = express.Router();
router.get("/", obtenerUsuarios);
router.get("/:id/historiales", verificarToken, obtenerUsuarioConHistorial);
router.post("/con-historial", verificarToken, crearUsuarioConHistorial);
router.put("/:id", verificarToken, actualizarUsuario);
router.delete("/:id", verificarToken, eliminarUsuario);
router.get("/me", verificarToken, obtenerMiPerfil);
module.exports = router;
