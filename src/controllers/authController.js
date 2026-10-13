const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");

async function registrar(req, res) {
	try {
		const { nombre, email, contrasena } = req.body;

		if (!nombre || !email || !contrasena) {
			return res.status(400).json({
				mensaje: "Nombre, email y contraseña son obligatorios.",
			});
		}

		if (nombre.trim().length < 2 || nombre.trim().length > 100) {
			return res.status(400).json({
				mensaje: "El nombre debe tener entre 2 y 100 caracteres.",
			});
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return res.status(400).json({
				mensaje: "Debes ingresar un email válido.",
			});
		}

		if (contrasena.length < 8) {
			return res.status(400).json({
				mensaje: "La contraseña debe tener al menos 8 caracteres.",
			});
		}

		const usuarioExistente = await Usuario.unscoped().findOne({
			where: { email },
		});

		if (usuarioExistente) {
			return res.status(409).json({
				mensaje: "Ya existe un usuario con ese email.",
			});
		}

		const hash = await bcrypt.hash(contrasena, 10);

		const usuario = await Usuario.create({
			nombre: nombre.trim(),
			email,
			contrasena: hash,
		});

		return res.status(201).json({
			mensaje: "Usuario registrado correctamente.",
			usuario: {
				id: usuario.id,
				nombre: usuario.nombre,
				email: usuario.email,
			},
		});
	} catch (error) {
		console.error("Error al registrar usuario:", error);

		return res.status(500).json({
			mensaje: "Error interno al registrar el usuario.",
		});
	}
}

async function login(req, res) {
	try {
		const { email, contrasena } = req.body;

		if (!email || !contrasena) {
			return res.status(400).json({
				mensaje: "Email y contraseña son obligatorios.",
			});
		}

		const usuario = await Usuario.unscoped().findOne({
			where: { email },
		});

		if (
			!usuario ||
			!usuario.contrasena ||
			!(await bcrypt.compare(contrasena, usuario.contrasena))
		) {
			return res.status(401).json({
				mensaje: "Email o contraseña incorrectos.",
			});
		}

		const token = jwt.sign(
			{
				id: usuario.id,
				email: usuario.email,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: process.env.JWT_EXPIRES_IN || "1h",
			},
		);

		return res.status(200).json({
			mensaje: "Inicio de sesión exitoso.",
			token,
		});
	} catch (error) {
		console.error("Error al iniciar sesión:", error);

		return res.status(500).json({
			mensaje: "Error interno al iniciar sesión.",
		});
	}
}

module.exports = { registrar, login };
