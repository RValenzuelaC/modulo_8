const express = require("express");

const {
	mostrarInicio,
	saludar,
	mostrarStatus,
} = require("../controllers/inicioController");

const router = express.Router();

router.get("/", mostrarInicio);
router.get("/saludar/:nombre", saludar);
router.get("/status", mostrarStatus);

module.exports = router;
