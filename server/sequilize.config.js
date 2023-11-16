// sequelize.config.js
require('dotenv').config(); // Load environment variables if using dotenv
const { orders, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;

module.exports = {
  development: {
    username: root,
    password: root,
    database: orders,
    host: '127.0.0.1',
    dialect: mysql,
  },
  // Add configurations for other environments if needed
};
