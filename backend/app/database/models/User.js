const { sequelize } = require("../sqlite/server");
const { DataTypes } = require('sequelize');
const Order = require("./Order");
const Cart = require("./Cart");

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        require: true
    },
    password: {
        type: DataTypes.STRING,
        require: true
    },
    firstName: {
        type: DataTypes.STRING,
        require: true
    },
    lastName: {
        type: DataTypes.STRING,
        require: true
    },
    address: {
        type: DataTypes.STRING,
        require: true
    },
})

User.hasMany(Order, { foreignKey: "userId", as: "orders" });
User.hasMany(Cart, { foreignKey: "userId", as: "cart" });

module.exports = User;