const express = require("express");
const path = require("path");

const inicioRoutes = require("./routes/inicioRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadroutes");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", authRoutes);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/upload", uploadRoutes);

app.use("/", inicioRoutes);
app.use("/usuarios", usuariosRoutes);

module.exports = app;
