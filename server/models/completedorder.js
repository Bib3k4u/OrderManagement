// models/completedorder.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Assuming sequelize instance is exported

const CompletedOrder = sequelize.define('CompletedOrder', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Sync the model with the database
CompletedOrder.sync().then(() => {
  console.log('CompletedOrder model synchronized with database');
});

module.exports = CompletedOrder;
