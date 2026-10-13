require("dotenv").config({ quiet: true });
require("./src/models/relaciones");

const app = require("./src/app");
const { sequelize, probarConexion } = require("./src/config/db");
const Usuario = require("./src/models/usuario");

const PORT = Number(process.env.PORT) || 3000;

async function crearUsuario(nombre, email) {
	const [usuario, creado] = await Usuario.findOrCreate({
		where: { email },
		defaults: { nombre },
	});

	console.log(
		creado
			? `Usuario creado: ${usuario.nombre}`
			: `El usuario ${usuario.email} ya existe`,
	);

	return usuario;
}

async function cargarUsuarios() {
	await crearUsuario("Ana García", "ana@blog.com");
	await crearUsuario("Luis Torres", "luis@blog.com");
	await crearUsuario("Pedro Soto", "pedro@blog.com");
}

async function iniciarServidor() {
	try {
		await probarConexion();

		// Crea la tabla si todavía no existe.
		await sequelize.sync();

		// Crea los registros solamente si no existen.
		await cargarUsuarios();

		app.listen(PORT, () => {
			console.log(`Servidor iniciado en http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error("Error al iniciar el servidor:", error.message);
	}
}

iniciarServidor();
