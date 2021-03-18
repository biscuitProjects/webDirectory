const sequelize = require('../config/db')

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
    desc_deps: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    worker_dep: {
      type: Sequelize.STRING,
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