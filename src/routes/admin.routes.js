import categoriaController from "../controllers/categoria.controller";
import productoController from "../controllers/producto.controller";
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

//rutas producto
Route.get('/producto', auhtMiddleware, productoController.listar);
Route.post('/producto', auhtMiddleware, productoController.guardar);
Route.get('/producto/:id', auhtMiddleware, productoController.mostrar);
Route.put('/producto/:id', auhtMiddleware, productoController.modificar);
Route.delete('/producto/:id', auhtMiddleware, productoController.eliminar);

export default Route;