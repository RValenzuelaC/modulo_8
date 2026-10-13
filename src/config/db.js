require("dotenv").config({ quiet: true });

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT),
		dialect: "postgres",
		logging: false,
	},
);

async function probarConexion() {
	try {
		await sequelize.authenticate();
		console.log("Conexión a PostgreSQL exitosa");
	} catch (error) {
		console.error("Error de conexión:", error.message);
	}
	// finally {
	// 	// await sequelize.close();
	// }
}

module.exports = { probarConexion, sequelize };
