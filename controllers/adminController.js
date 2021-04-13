const smallServerScripts = require('../smallServerScripts/smallServerScripts')
const Dep = require('../models/dep')
const Subd = require('../models/subd')
const Worker = require('../models/worker')
const employeePosts = require('../models/employee_posts')
const { Sequelize } = require('sequelize')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("../config/config")

class adminController {
     async getDirectors(req, res){
          try {
               const token = req.headers.authorization.split(' ')[1]
               const validateToken = smallServerScripts.getDataFromToken(token).then((data) =>{
                    if(data.code){
                         console.log('\x1b[41m%s\x1b[0m', data.code)
                         res.json({message: 'error'})    
                    }
                    if(data.roles != 'admin'){
                         console.log(data)
                         console.log('\x1b[41m%s\x1b[0m', 'У вас нет прав')
                         res.json({message: 'У вас нет прав'})    
                    }
                    return data.role
               })

               const deps = await Worker.findAll({
                    where: {
                         employee_worker: {
                             [Sequelize.Op.like]: `%Director%`
                         }
                     }
               })
               console.log(deps)
               res.json({message: deps})    
          } catch (error) {
               console.log('\x1b[41m%s\x1b[0m', error)
               res.json({message: 'error'})    
          }
     }

     async createDep(req, res){
          try {
               const token = req.headers.authorization.split(' ')[1]
               const {name_deps, desc_deps, worker_dep} = req.body
               const org_deps = 'k1m'
               const validateToken = smallServerScripts.getDataFromToken(token).then((data) =>{
                    if(data.code){
                         console.log('\x1b[41m%s\x1b[0m', data.code)
                         res.json({message: 'error'})    
                    }
                    if(data.roles != 'admin'){
                         console.log(data)
                         console.log('\x1b[41m%s\x1b[0m', 'У вас нет прав')
                         res.json({message: 'У вас нет прав'})    
                    }
                    return data.role
               })

               Dep.create({
                    name_deps,
                    desc_deps,
                    org_deps,
                    worker_dep
               })
               console.log(deps)
               res.json({message: 'Новый департамент создан'})    
          } catch (error) {
               console.log('\x1b[41m%s\x1b[0m', error)
               res.json({message: 'error'})    
          }
     }

     async getEmployee(req, res){
          try {
               const token = req.headers.authorization.split(' ')[1]
               const validateToken = smallServerScripts.getDataFromToken(token).then((data) =>{
                    if(data.code){
                         console.log('\x1b[41m%s\x1b[0m', data.code)
                         res.json({message: 'error'})    
                    }
                    if(data.roles != 'admin'){
                         console.log(data)
                         console.log('\x1b[41m%s\x1b[0m', 'У вас нет прав')
                         res.json({message: 'У вас нет прав'})    
                    }
                    return data.role
               })

               const employee = await employeePosts.findAll()
               console.log(employee)
               res.json({message: deps})    
          } catch (error) {
               console.log('\x1b[41m%s\x1b[0m', error)
               res.json({message: 'error'})    
          }
     }

     async createEmployee(req, res){
          try {
               const token = req.headers.authorization.split(' ')[1]
               const {name, dep} = req.body
               const validateToken = smallServerScripts.getDataFromToken(token).then((data) =>{
                    if(data.code){
                         console.log('\x1b[41m%s\x1b[0m', data.code)
                         res.json({message: 'error'})    
                    }
                    if(data.roles != 'admin'){
                         console.log(data)
                         console.log('\x1b[41m%s\x1b[0m', 'У вас нет прав')
                         res.json({message: 'У вас нет прав'})    
                    }
                    return data.role
               })

               employeePosts.create({
                    name,
                    dep
               })
               res.json({message: 'Новая должность создана'})    
          } catch (error) {
               console.log('\x1b[41m%s\x1b[0m', error)
               res.json({message: 'error'})    
          }
     }


     async getSubd(req, res){
          try {
               const token = req.headers.authorization.split(' ')[1]
               const validateToken = smallServerScripts.getDataFromToken(token).then((data) =>{
                    if(data.code){
                         console.log('\x1b[41m%s\x1b[0m', data.code)
                         res.json({message: 'error'})    
                    }
                    if(data.roles != 'admin'){
                         console.log(data)
                         console.log('\x1b[41m%s\x1b[0m', 'У вас нет прав')
                         res.json({message: 'У вас нет прав'})    
                    }
                    return data.role
               })

               const employee = await Subd.findAll()
               console.log(employee)
               res.json({message: deps})    
          } catch (error) {
               console.log('\x1b[41m%s\x1b[0m', error)
               res.json({message: 'error'})    
          }
     }

     async createSubd(req, res){
          try {
               const token = req.headers.authorization.split(' ')[1]
               const {name_subd, desc_subd, dep_subd, manager_new_subd} = req.body
               const validateToken = smallServerScripts.getDataFromToken(token).then((data) =>{
                    if(data.code){
                         console.log('\x1b[41m%s\x1b[0m', data.code)
                         res.json({message: 'error'})    
                    }
                    if(data.roles != 'admin'){
                         console.log(data)
                         console.log('\x1b[41m%s\x1b[0m', 'У вас нет прав')
                         res.json({message: 'У вас нет прав'})    
                    }
                    return data.role
               })

               
               const restructuringDirector = await SmallScripts.getDirector(dep_subd)
               const director_worker = restructuringDirector[0].worker_dep

               Subd.create({
                    name_subd,
                    desc_subd,
                    dep_subd,
                    manager_new_subd,
                    director_worker
               })
               res.json({message: 'Новая должность создана'})    
          } catch (error) {
               console.log('\x1b[41m%s\x1b[0m', error)
               res.json({message: 'error'})    
          }
     }
     

}

module.exports = new adminController()
