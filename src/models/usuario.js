const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Usuario = sequelize.define(
	"Usuario",
	{
		nombre: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(150),
			allowNull: false,
			unique: true,
		},
		contrasena: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
	},
	{
		tableName: "usuarios",
		timestamps: false,
	},
);

module.exports = Usuario;
