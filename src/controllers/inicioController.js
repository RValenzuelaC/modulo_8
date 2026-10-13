const gestorL = require("../helpers/gestorLogs");

const mostrarInicio = (req, res) => {
	res.render("saludo");
};

const saludar = (req, res) => {
	const nombre = req.params.nombre;

	gestorL.registrarLog("info", "Ha saludado con éxito", req.originalUrl);

	res.send(`Hola ${nombre}, bienvenido al servidor`);
};

const mostrarStatus = (req, res) => {
	gestorL.registrarLog(
		"info",
		"Se ha ingresado al servidor correctamente",
		req.originalUrl,
	);

	res.status(200).json({
		status: "OK",
		message: "Servidor correctamente corriendo",
	});
};

module.exports = {
	mostrarInicio,
	saludar,
	mostrarStatus,
};
