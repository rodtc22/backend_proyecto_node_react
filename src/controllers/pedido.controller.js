import { Op } from "sequelize";
import models from "../database/models";

export default {
  index: async (req, res) => {
    try {
      const q = req.query.q;
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);

      const offset = (page - 1) * limit; // desde que registro

      const pedidos = await models.Pedido.findAndCountAll({
        where: {
          fecha: {
            [Op.like]: `%${q}%`,
          },
        },
        include: [models.Cliente, models.Producto], // en cada pedido voy a incluir al cliente y sus productos
        offset: offset,
        limit: limit,
      });

      return res.status(200).json(pedidos);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  store: async (req, res) => {
    // para guardar
    try {
      /*
            {  
                clienteId: 10,
                items: [
                    {productoId: 2, cantidad: 1},
                    {productoId: 6, cantidad: 9},
                    {productoId: 3, cantidad: 6},
                ]
            }
            */
      const { clienteId, items } = req.body;
      const fecha = new Date();

      // nuevo pedido
      const pedido = await models.Pedido.create({
        fecha: fecha,
        estado: 1,
        clienteId: clienteId,
      });

      // guardar los productos de venta asociado a pedido
      items.forEach(async (prod) => {
        //agregamos cada producto al pedido
        await pedido.addProducto(prod.productoId, {
          through: { cantidad: prod.cantidad },
        });
      });

      return res
        .status(201)
        .json({ message: "Pedido registrado", pedido: pedido });
    } catch (error) {
      return res.status(422).json({ message: error.message });
    }
  },
  show: async (req, res) => {
    try {
      //antes
      // const id = req.params.id;
      // const pedido = await models.Pedido.findByPk(id);

      //despues
      const id = req.params.id;
      const pedido = await models.Pedido.find({
        // a diferencia de los otros controladores, lo hice asi para que me devolviera varias cosas
        where: {
          id: id,
        },
        include: [models.Cliente, models.Producto],
      });

      if (pedido.id) {
        return res.status(200).json(pedido);
      } else {
        return res.status(404).json({ message: "Pedido no existe" });
      }
    } catch (error) {
      return res.status(500).json({ message: error_message });
    }
  },
  update: async (req, res) => {},
  destroy: async (req, res) => {},
  nuevoCliente: async (req, res) => {
    try {
      const { nombre_completo, correo, ci_nit, telefono } = req.body;
      const cliente = await models.Cliente.create({
        nombre_completo,
        correo,
        ci_nit,
        telefono,
      });

      if (cliente.id) {
        return res
          .status(201)
          .json({ message: "Cliente registrado", cliente: cliente });
      } else {
        return res
          .status(404)
          .json({ message: "error, nuevocliente no registrado" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  buscarCliente: async (req, res) => {
    try {
      const q = req.query.buscar;

      const { nombre_completo, correo, ci_nit, telefono } = req.body;
      const cliente = await models.Cliente.findOne({
        where: {
          nombre_completo: {
            [Op.like]: `%${q}%`,
          },
        },
      });

      return res.status(200).json(cliente);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
