const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("../config/config")
const Dep = require('../models/dep')
const Subd = require('../models/subd')
const Worker = require('../models/worker')
const employeePosts = require('../models/employee_posts')
const { Sequelize } = require('sequelize')

const SmallScripts = require('../smallServerScripts/smallServerScripts')

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
            where: {
                fullName_worker: {
                    [Sequelize.Op.like]: `%${fn}%`
                }
            }
        })

        if(!getWorker.length){
            return res.status(400).json({message: `Такого сотрудника нет`})
        } 
        res.json({message: getWorker})  
    }


    async createNewWorker(req, res){
        const {fullName_worker, tel_worker, dep_worker, subd_worker, employee_worker, gender} = req.body
        // console.log(`${fullName}  ${tel}  ${dep}  ${subd}  ${employee}  ${gender}`)

        

        const restructuringDirector = await SmallScripts.getDirector(dep_worker)
        const restructuringManager = await SmallScripts.getManager(subd_worker)

        const director_worker = restructuringDirector[0].worker_dep
        const manager_worker = restructuringManager[0].manager_new_subd

        Worker.create({
            fullName_worker,
            employee_worker,
            tel_worker,
            subd_worker,
            dep_worker,
            manager_worker,
            director_worker,
            gender
        })
        res.redirect('/regNewWorker')
    }

    async getEmployeePosts(req, res){
        const {dep} = req.body
        const getEP = await employeePosts.findAll({
            where: {dep: dep}
        })

        res.json({message: getEP})
    }
}



module.exports = new workerController()
