function subirArchivo(req, res) {
	if (!req.file) {
		return res.status(400).json({
			mensaje: "Debes adjuntar un archivo en el campo 'file'.",
		});
	}

	return res.status(201).json({
		mensaje: "Archivo subido correctamente.",
		archivo: {
			nombre: req.file.filename,
			tipo: req.file.mimetype,
			tamano: req.file.size,
			url: `/uploads/${req.file.filename}`,
		},
	});
}

module.exports = { subirArchivo };
