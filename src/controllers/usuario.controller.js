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

            const usuarios = await models.User.findAndCountAll({
                where: {
                    email: {
                        [Op.like]: `%${q}%`
                    }
                },
                offset: offset,
                limit: limit
            });
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    },
    guardar: async (req, res) => {
        try {
            const datos = req.body;
            const usuario = await models.User.create(datos);

            if (usuario.id) {
                return res.status(201).json({message: "Usuario registrado"});    
            }

        } catch (error) {
            return res.status(422).json({message: error.message});
        }
    },
    mostrar: async (req, res) => {
        try {
            const id = req.params.id;
            const usuario = await models.User.findByPk(id);

            if (usuario.id) {
                return res.status(200).json(usuario);
            }
            return res.status(404).json({message: "Usuario no existe"});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    },
    modificar: async (req, res) => {
        try {
            const id = req.params.id;
            const usuario = await models.User.findByPk(id);

            if (usuario.id) {
                await models.User.update(req.body, {
                    where: {
                        id : id
                    }
                });
            }
            return res.status(404).json({message: "Usuario actualizado"});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    },
    eliminar: async (req, res) => {
        try {
            const id = req.params.id;

            await models.User.destroy({
                where: {
                    id: id
                }
            });
            return res.status(200).json({message: "Usuario eliminado"})
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
}