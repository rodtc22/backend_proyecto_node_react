import {Op} from "sequelize"
import models from "../database/models";

export default {
    listar: async (req, res)  => {
        try {
            // /api/producto?q=teclado&page=1&limit=10
            const q = req.query.q;
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);

            const offset = (page-1) * limit; // apartir de que dato quiero mostrar

            const clientes = await models.Cliente.findAndCountAll({
                where: {
                    id: {
                        [Op.like]: `%${q}%`
                    }
                },
                offset: offset,
                limit: limit
            });
            return res.status(200).json(clientes);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    },
    guardar: async (req, res) => {
        try {
            const datos = req.body;
            const cliente = await models.Cliente.create(datos);

            if (cliente.id) {
                return res.status(201).json({message: "Cliente registrado"});    
            }

        } catch (error) {
            return res.status(422).json({message: error.message});
        }
    },
    mostrar: async (req, res) => {
        try {
            const id = req.params.id;
            const cliente = await models.Cliente.findByPk(id);

            if (cliente.id) {
                return res.status(200).json(cliente);
            }
            return res.status(404).json({message: "Cliente no existe"});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    },
    modificar: async (req, res) => {
        try {
            const id = req.params.id;
            const cliente = await models.Cliente.findByPk(id);

            if (cliente.id) {
                await models.Cliente.update(req.body, {
                    where: {
                        id : id
                    }
                });
            }
            return res.status(404).json({message: "Cliente actualizado"});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    },
    eliminar: async (req, res) => {
        try {
            const id = req.params.id;

            await models.Cliente.destroy({
                where: {
                    id: id
                }
            });
            return res.status(200).json({message: "Cliente eliminado"})
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
}