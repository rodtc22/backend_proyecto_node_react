import categoriaController from "../controllers/categoria.controller";
import auhtMiddleware from "../middlewares/auth.middleware";
const { Router } = require("express");

const Route = Router();

//endpoint (o rutas)

//rutas categoria
Route.get('/categoria', auhtMiddleware, categoriaController.listar);
Route.post('/categoria', auhtMiddleware, categoriaController.guardar);
Route.get('/categoria/:id', auhtMiddleware, categoriaController.mostrar);
Route.put('/categoria/:id', auhtMiddleware, categoriaController.modificar);
Route.delete('/categoria/:id', auhtMiddleware, categoriaController.eliminar);

export default Route;