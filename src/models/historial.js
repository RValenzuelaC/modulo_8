const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Historial = sequelize.define(
	"Historial",
	{
		accion: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
	},
	{
		tableName: "historiales",
		timestamps: false,
	},
);

module.exports = Historial;
