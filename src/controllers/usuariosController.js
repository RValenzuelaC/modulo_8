const { sequelize } = require("../config/db");

const { Usuario, Historial } = require("../models/relaciones");

// GET /usuarios
async function obtenerUsuarios(req, res) {
	try {
		const usuarios = await Usuario.findAll({
			attributes: ["id", "nombre", "email"],
			order: [["id", "ASC"]],
		});

		res.status(200).json({
			total: usuarios.length,
			usuarios,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
}

async function obtenerMiPerfil(req, res) {
	try {
		const usuario = await Usuario.findByPk(req.usuario.id, {
			attributes: ["id", "nombre", "email"],
		});

		if (!usuario) {
			return res.status(404).json({
				mensaje: "Usuario no encontrado.",
			});
		}

		return res.status(200).json(usuario);
	} catch (error) {
		console.error("Error al obtener el perfil:", error);

		return res.status(500).json({
			mensaje: "Error al obtener el perfil.",
		});
	}
}

// PUT /usuarios/:id
async function actualizarUsuario(req, res) {
	try {
		const { id } = req.params;
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({
				error: "El nuevo email es requerido",
			});
		}

		const usuario = await Usuario.findByPk(id);

		if (!usuario) {
			return res.status(404).json({
				error: "Usuario no encontrado",
			});
		}

		await usuario.update({ email });

		res.status(200).json({
			mensaje: "Usuario actualizado",
			usuario,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
}

// DELETE /usuarios/:id
async function eliminarUsuario(req, res) {
	try {
		const { id } = req.params;

		const usuario = await Usuario.findByPk(id);

		if (!usuario) {
			return res.status(404).json({
				error: "Usuario no encontrado",
			});
		}

		await usuario.destroy();

		res.status(200).json({
			mensaje: "Usuario eliminado",
		});
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
}

// POST /usuarios/con-historial
async function crearUsuarioConHistorial(req, res) {
	let transaccion;

	try {
		const { nombre, email, accion, forzarError } = req.body;

		if (!nombre || !email || !accion) {
			return res.status(400).json({
				error: "Nombre, email y acción son requeridos",
			});
		}

		transaccion = await sequelize.transaction();

		const usuario = await Usuario.create(
			{
				nombre,
				email,
			},
			{
				transaction: transaccion,
			},
		);

		console.log(`Usuario creado temporalmente: ${usuario.nombre}`);

		if (forzarError === true) {
			throw new Error("Error simulado antes de crear el historial");
		}

		const historial = await Historial.create(
			{
				accion,
				usuarioId: usuario.id,
			},
			{
				transaction: transaccion,
			},
		);

		await transaccion.commit();

		console.log("Transacción exitosa: usuario e historial guardados");

		res.status(201).json({
			mensaje: "Usuario e historial creados correctamente",
			usuario,
			historial,
		});
	} catch (error) {
		if (transaccion) {
			await transaccion.rollback();
			console.log("Rollback realizado");
		}

		res.status(500).json({
			error: error.message,
			mensaje: "No se guardó ninguna operación",
		});
	}
}
async function obtenerUsuarioConHistorial(req, res) {
	try {
		const { id } = req.params;

		const usuario = await Usuario.findByPk(id, {
			attributes: ["id", "nombre", "email"],
			include: [
				{
					model: Historial,
					as: "historiales",
					attributes: ["id", "accion"],
				},
			],
		});

		if (!usuario) {
			return res.status(404).json({
				error: "Usuario no encontrado",
			});
		}

		res.status(200).json({
			usuario,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
}

module.exports = {
	obtenerUsuarios,
	obtenerUsuarioConHistorial,
	actualizarUsuario,
	eliminarUsuario,
	crearUsuarioConHistorial,
	obtenerMiPerfil,
};
