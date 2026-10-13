const Usuario = require("./usuario");
const Historial = require("./historial");

Usuario.hasMany(Historial, {
	foreignKey: "usuarioId",
	as: "historiales",
	onDelete: "CASCADE",
});

Historial.belongsTo(Usuario, {
	foreignKey: "usuarioId",
	as: "usuario",
});

module.exports = {
	Usuario,
	Historial,
};
