const sequelize = require('../config/db')

const { Sequelize, DataTypes, Model } = require('sequelize')

const employeePosts = sequelize.define("employee_posts", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    dep: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = employeePosts