const sequelize = require('../db')
const {secret} = require("../config")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Sequelize, DataTypes, Model } = require('sequelize')

const Worker = sequelize.define("workers", {
    id_worker: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    fullName_worker: {
      type: Sequelize.STRING,
      allowNull: false
    },
    employee_worker: {
      type: Sequelize.STRING,
      allowNull: false
    },
    tel_worker:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    subd_worker:{
        type: Sequelize.STRING,
        allowNull: false
    },
    manager_worker: {
        type: Sequelize.STRING,
        allowNull: false
      },
    dep_worker: {
        type: Sequelize.STRING,
        allowNull: false
    },
    director_worker: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = Worker