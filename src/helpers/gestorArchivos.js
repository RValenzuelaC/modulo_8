const fs = require("fs");
const RUTA_ARCHIVO = "./data/tareas.json";

const guardarTareas = (tareas) => {
	const contenido = JSON.stringify(tareas, null, 2);
	fs.writeFileSync(RUTA_ARCHIVO, contenido);
};

const leerTareas = () => {
	if (!fs.existsSync(RUTA_ARCHIVO)) {
		return [];
	}
	const contenido = fs.readFileSync(RUTA_ARCHIVO, "utf-8");
	return JSON.parse(contenido);
};

const agregarTarea = (titulo) => {
	const tareas = leerTareas();
	const nuevaTarea = {
		id: Date.now(),
		titulo: titulo,
		completada: false,
		fechaCreacion: new Date().toISOString(),
	};
	tareas.push(nuevaTarea);
	guardarTareas(tareas);
	return nuevaTarea;
};
const completarTarea = (id) => {
	const tareas = leerTareas();
	const tarea = tareas.find((t) => t.id === id);
	if (!tarea) {
		return null;
	}
	tarea.completada = true;
	guardarTareas(tareas);
	return tarea;
};

const eliminarTarea = (id) => {
	const tareas = leerTareas();
	const tareasActualizadas = tareas.filter((t) => t.id !== id);
	if (tareas.length === tareasActualizadas.length) {
		return false;
	}
	guardarTareas(tareasActualizadas);
	return true;
};

module.exports = {
	guardarTareas,
	leerTareas,
	agregarTarea,
	completarTarea,
	eliminarTarea,
};
