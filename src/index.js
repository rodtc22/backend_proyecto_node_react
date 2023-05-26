// const express = require('express')
import express from "express";
require('dotenv').config()

import rutasAuth from "./routes/auth.routes";

const app = express();

//habilitamos las rutas
app.use("/api", rutasAuth); // rutas o urls de autenticacion

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto http://127.0.0.1:${PORT}`);
});