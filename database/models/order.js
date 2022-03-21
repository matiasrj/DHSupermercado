'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'idUser'});

      this.hasMany(models.Order_detail, {
        foreignKey: 'idOrder',
        as: 'order_detail'
      })

    }
  };
  Order.init({
    nombre: DataTypes.STRING,
    medioPago: DataTypes.STRING,
    user_idUser: DataTypes.INTEGER,
    createdAt: {

      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {

      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
    sequelize,
    modelName: 'Order',
    freezeTableName: true,
    
  });
  return Order;
};