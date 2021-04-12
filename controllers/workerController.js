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
        try {
            const token = req.headers.authorization.split(' ')[1]
            const getDep = await Dep.findAll()
            res.json({message: getDep})    
        } catch (error) {
            console.log('\x1b[41m%s\x1b[0m', error)
            res.json({message: 'error'})    
        }
      
    }

    async getSubdsFromDep(req, res){
        try {
            const {dep} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const getSubd = await Subd.findAll({ where: {dep_subd: dep}})    
            if(!getSubd.length){
                console.log('\x1b[37m%s\x1b[0m', `Таких подразделений нет     dep = ${dep}`)
                return res.status(400).json({message: `Таких подразделений нет`})
            }
            res.json({message: getSubd})  
        } catch (error) {
            console.log('\x1b[41m%s\x1b[0m', error)
            res.json({message: 'error'})  
        }
       
    }

    async getWorkersFromSubd(req, res){
        try {
            const {subd} = req.body
            const token = req.headers.authorization.split(' ')[1]
            const getWorkers = await Worker.findAll({ where: {subd_worker: subd}})   
            if(!getWorkers.length){
                console.log('\x1b[37m%s\x1b[0m', `Поиск сотрудников не удался    subd = ${subd}`)
                return res.status(400).json({message: `Поиск не удался`})
            } 
            res.json({message: getWorkers})  
        } catch (error) {
            console.log('\x1b[41m%s\x1b[0m', error)
        }
        
    }

    async searchWorkers(req, res){
        try {
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
                console.log('\x1b[37m%s\x1b[0m', `Такого сотрудника нет   worker = ${fn}`)
                return res.status(400).json({message: `Такого сотрудника нет`})
            } 
            res.json({message: getWorker})  
        } catch (error) {
            console.log('\x1b[41m%s\x1b[0m', error)
        }
       
    }


    async searchWorkersLimit(req, res){
        try {
            const {fn} = req.body
            console.log('-- --  ')
            console.log(req.body)
            console.log('- -- ')
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
                console.log('\x1b[37m%s\x1b[0m', `Такого сотрудника нет    fn = ${fn}`)
                return res.status(400).json({message: `Такого сотрудника нет`})
            } 
            res.json({message: getWorker})  
        } catch (error) {
            console.log('\x1b[41m%s\x1b[0m', error)
        }
        
    }


    async createNewWorker(req, res){

        try {
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
            console.log('\x1b[42m%s\x1b[0m', `Сотруник создан   fn = ${fullName_worker}`)
            res.redirect('/regNewWorker')
        } catch (error) {
            console.log('\x1b[41m%s\x1b[0m', error)
        }
        
    }

    async getEmployeePosts(req, res){
        try {
            const {dep} = req.body
            const getEP = await employeePosts.findAll({
                where: {dep: dep}
            })
            if(getEP.length){
                res.json({message: getEP})
            } else{
                console.log('\x1b[37m%s\x1b[0m', `Такой должности нет    dep = ${dep}`)
            }
            
        } catch (error) {
            console.log('\x1b[41m%s\x1b[0m', error)
        }
       
    }
}



module.exports = new workerController()
