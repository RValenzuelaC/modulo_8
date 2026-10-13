const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = require("../middlewares/uploadMiddlewares");
const { subirArchivo } = require("../controllers/uploadcontroller");

router.post(
	"/",
	(req, res, next) => {
		upload.single("file")(req, res, (error) => {
			if (error instanceof multer.MulterError) {
				const esTamano = error.code === "LIMIT_FILE_SIZE";

				return res.status(esTamano ? 413 : 400).json({
					mensaje: esTamano
						? "El archivo no puede superar los 5 MB."
						: "No se pudo procesar el archivo.",
				});
			}

			if (error) {
				return res.status(400).json({
					mensaje: error.message,
				});
			}

			next();
		});
	},
	subirArchivo,
);

module.exports = router;
