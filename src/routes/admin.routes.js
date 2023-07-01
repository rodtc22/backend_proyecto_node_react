import categoriaController from "../controllers/categoria.controller";
import clienteController from "../controllers/cliente.controller";
import productoController from "../controllers/producto.controller";
import pedidoController from "../controllers/pedido.controller";
import usuarioController from "../controllers/usuario.controller";
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

//rutas usuario 
Route.get('/usuario', auhtMiddleware, usuarioController.listar);
Route.post('/usuario', auhtMiddleware, usuarioController.guardar);
Route.get('/usuario/:id', auhtMiddleware, usuarioController.mostrar);
Route.put('/usuario/:id', auhtMiddleware, usuarioController.modificar);
Route.delete('/usuario/:id', auhtMiddleware, usuarioController.eliminar);

//rutas clientes
Route.get('/cliente', auhtMiddleware, clienteController.listar);
Route.post('/cliente', auhtMiddleware, clienteController.guardar);
Route.get('/cliente/:id', auhtMiddleware, clienteController.mostrar);
Route.put('/cliente/:id', auhtMiddleware, clienteController.modificar);
Route.delete('/cliente/:id', auhtMiddleware, clienteController.eliminar);

//para pedido
Route.post('/pedido/nuevo-cliente', auhtMiddleware, pedidoController.nuevoCliente);
Route.get('/pedido/buscar-cliente', auhtMiddleware, pedidoController.buscarCliente);

Route.get('/pedido', auhtMiddleware, pedidoController.index);
Route.post('/pedido', auhtMiddleware, pedidoController.store);
Route.get('/pedido/:id', auhtMiddleware, pedidoController.show);

export default Route;