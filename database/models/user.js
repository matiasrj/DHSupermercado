'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Order, {
        foreignKey: 'idUser',
        as: 'Order'
      })

    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    fechaNac: DataTypes.STRING,
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
    modelName: 'User',
  });
  return User;
};