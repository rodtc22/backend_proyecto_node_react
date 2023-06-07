// const express = require('express')
import express from "express";
import cors from "cors";
import rutasAuth from "./routes/auth.routes";


require('dotenv').config()

const app = express();

// habilitamos CORS
app.use(cors());

// para capturar datos del req.body
app.use(express.json()); 

//habilitamos las rutas
app.use("/api", rutasAuth); // rutas o urls de autenticacion

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto http://127.0.0.1:${PORT}`);
});