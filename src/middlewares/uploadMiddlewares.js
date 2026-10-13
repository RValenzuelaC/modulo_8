const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const carpetaUploads = path.join(__dirname, "../../uploads");

fs.mkdirSync(carpetaUploads, { recursive: true });

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, carpetaUploads);
	},

	filename: (_req, file, cb) => {
		const extension = path.extname(file.originalname).toLowerCase();
		cb(null, `${crypto.randomUUID()}${extension}`);
	},
});

const tiposPermitidos = ["image/jpeg", "image/png"];

const upload = multer({
	storage,
	limits: {
		fileSize: 5 * 1024 * 1024,
		files: 1,
	},

	fileFilter: (_req, file, cb) => {
		if (!tiposPermitidos.includes(file.mimetype)) {
			return cb(new Error("Solo se permiten imágenes PNG o JPEG."));
		}

		cb(null, true);
	},
});

module.exports = upload;
