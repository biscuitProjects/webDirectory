const sequelize = require('../config/db')
const {secret} = require("../config/config")
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
        allowNull: false,
        defaultValue: "NULL"
    },
    dep_worker: {
        type: Sequelize.STRING,
        allowNull: false
    },
    code_worker: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "NULL"
    },
    manager_worker: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "NULL"
    },
    director_worker: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "NULL"
    },
    gender_worker: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "NULL"
    }

}, {
    timestamps: false,
})

module.exports = Worker