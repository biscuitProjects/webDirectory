const sequelize = require('../config/db')
const {secret} = require("../config/config")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Sequelize, DataTypes, Model } = require('sequelize')

const Dep = sequelize.define("subdivisions", {
    id_subd: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name_subd: {
      type: Sequelize.STRING,
      allowNull: false
    },
    desc_subd: {
      type: Sequelize.STRING,
      allowNull: false
    },
    manager_new_subd: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dep_subd: {
      type: Sequelize.STRING,
      allowNull: false
    },
    director_subd: {
      type: Sequelize.STRING,
      allowNull: false
    },
}, {
    timestamps: false,
})

module.exports = Dep