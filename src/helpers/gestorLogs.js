const fs = require("fs");
const path = require("path");

const RUTA_ARCHIVO = path.join(__dirname, "../data/logs.json");

const guardarLog = (logs) => {
	const contenido = JSON.stringify(logs, null, 2);
	fs.writeFileSync(RUTA_ARCHIVO, contenido);
};
const registrarLog = (tipo, mensaje, ruta) => {
	const tiposValidos = ["info", "warning", "error"];

	if (!tiposValidos.includes(tipo)) {
		console.log("Tipo inválido");
		return null;
	}

	const logs = obtenerLogs();

	const nuevoLog = {
		id: Date.now(),
		tipo,
		mensaje,
		ruta,
		fechaCreacion: new Date().toISOString(),
	};

	logs.push(nuevoLog);
	guardarLog(logs);

	return nuevoLog;
};
const obtenerLogs = () => {
	if (!fs.existsSync(RUTA_ARCHIVO)) {
		return [];
	}
	const contenido = fs.readFileSync(RUTA_ARCHIVO, "utf-8");
	return JSON.parse(contenido);
};

const filtrarPorTipo = (tipo) => {
	const logs = obtenerLogs();
	const tiposLog = logs.filter((l) => l.tipo === tipo);
	if (logs.length === tiposLog.length) {
		return false;
	}
	guardarLog(tiposLog);
	return true;
};

const eliminarLog = (id) => {
	const logs = obtenerLogs();
	const logsActualizados = logs.filter((l) => l.id !== id);
	if (logs.length === logsActualizados.length) {
		return false;
	}
	guardarLog(logsActualizados);
	return true;
};
const limpiarLogs = () => {
	let logs = obtenerLogs();
	logs = [];
	guardarLog(logs);
	return logs;
};

module.exports = {
	registrarLog,
	obtenerLogs,
	eliminarLog,
	limpiarLogs,
	filtrarPorTipo,
	guardarLog,
};
