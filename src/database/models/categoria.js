'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { // AQUI VIENEN LAS RELACIONES  1:N
      models.Categoria.hasMany(models.Producto, {
        foreignKey: "categoriaId"
      });
      // define association here
    }
  }
  Categoria.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'El nombre de categoria es obligatorio'
        },
        len: {
          args: [3,20],
          msg: 'El campo nombre deber tener entre 3 y 20 caracteres'
        }
      }
    },
    detalle: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Categoria',
  });
  return Categoria;
};