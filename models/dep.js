const sequelize = require('../db')
const {secret} = require('../config')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Sequelize, DataTypes, Model } = require('sequelize')

const Dep = sequelize.define("deps", {
    id_deps: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name_deps: {
      type: Sequelize.STRING,
      allowNull: false
    },
    director_deps: {
      type: Sequelize.STRING,
      allowNull: false
    },
    desc_deps: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    org_deps: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
})

module.exports = Dep