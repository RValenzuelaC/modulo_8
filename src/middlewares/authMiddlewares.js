const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
	const authorization = req.headers.authorization;

	if (!authorization || !authorization.startsWith("Bearer ")) {
		return res.status(401).json({
			mensaje: "Debes enviar un token de autenticación.",
		});
	}

	const token = authorization.split(" ")[1];

	try {
		req.usuario = jwt.verify(token, process.env.JWT_SECRET);
		next();
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			return res.status(401).json({
				mensaje: "El token ha expirado. Inicia sesión nuevamente.",
			});
		}

		return res.status(401).json({
			mensaje: "El token es inválido.",
		});
	}
}

module.exports = verificarToken;
