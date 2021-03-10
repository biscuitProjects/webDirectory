const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("../config")
const Dep = require('../models/dep')
const Subd = require('../models/subd')
const Worker = require('../models/worker')
const { Sequelize } = require('sequelize')

class workerController {
    // получаем департамент по имени
    async getDeps(req, res){
        const token = req.headers.authorization.split(' ')[1]
        const getDep = await Dep.findAll()
        res.json({message: getDep})  
    }

    async getSubdsFromDep(req, res){
        const {dep} = req.body
        const token = req.headers.authorization.split(' ')[1]
        const getSubd = await Subd.findAll({ where: {dep_subd: dep}})    
        if(!getSubd.length){
            return res.status(400).json({message: `Таких подразделений нет`})
        }
        res.json({message: getSubd})  
    }

    async getWorkersFromSubd(req, res){
        const {subd} = req.body
        const token = req.headers.authorization.split(' ')[1]
        const getWorkers = await Worker.findAll({ where: {subd_worker: subd}})   
        if(!getWorkers.length){
            return res.status(400).json({message: `Таких подразделений нет`})
        } 
        res.json({message: getWorkers})  
    }

    async searchWorkers(req, res){
        const {fn} = req.body
        const token = req.headers.authorization.split(' ')[1]
        const getWorker = await  Worker.findAll({
            limit: 5,
            where: {
                fullName_worker: {
                    [Sequelize.Op.like]: `%${fn}%`
                }
            }
        })
        if(!getWorker.length){
            return res.status(400).json({message: `Таких подразделений нет`})
        } 
        res.json({message: getWorker})  
    }
}

module.exports = new workerController()
