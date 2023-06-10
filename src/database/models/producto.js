'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { // 1 : N
      // define association here
      models.Producto.belongsTo(models.Categoria, {
        foreignKey: "categoriaId"
      });

      models.Producto.belongsToMany(models.Pedido, {
        through: "PedidoProducto"
      });
    }
  }
  Producto.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "El campo nombre no debe estar vacio"
        },
        len: {
          args: [3,20],
          msg: 'El nombre del producto debe estar entre [3,20] caracteres'
        }
      }
    },
    precio: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    imagen: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    estado: DataTypes.BOOLEAN,
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};