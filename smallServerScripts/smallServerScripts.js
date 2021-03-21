const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("../config/config")
const db = require('../config/db')
const User = require('../models/user') 

const Dep = require('../models/dep')
const Subd = require('../models/subd')


class SmallScripts {

    // Тут ид равен логину
    generateAccessToken(id, roles){
        const payload = {
            id,
            roles
        }
        return jwt.sign(payload, secret, {expiresIn: "24h"} )
    }

    // получаем пользователя
    async userExists(username){
        const searchUser = `SELECT * FROM users WHERE username = '${username}'`
        const [rows, fields] = await db.execute(searchUser)
        if(!rows.length){
            return '001'
        } 
        const user = {
            "username" : rows[0]['username'],
            "password" : rows[0]['password'],
            "role" : rows[0]['role'],
        }
        return user
    }

    async checkUserPassword(dbPass, inputPassword){
        // проверяем верный ли пароль ввёл пользователь
        const validPassword = bcrypt.compareSync(inputPassword, dbPass)
        if (!validPassword) {
            return 0
        }
        const token = generateAccessToken(user.username, user.role)
        return token
    }


    async changeUsername(newUsername){
        const hashPassword = bcrypt.hashSync(newUsername, 7)
        const sql = `UPDATE users SET username='${hashPassword}' WHERE username = '${newUsername}'`;
        await db.execute(sql)
        return 'true'
    }
   

    async getDataFromToken(token){
        try {
            if (!token) {
                console.log('null')
                return "Токен пустой"
            }
            const decodedData = jwt.verify(token, secret)
            return decodedData
        } catch (e) {
            return  {'error': e, 'code': 'getDataFromToken'}
        }
    }
    
    async createHashPass(password){

    }

    async checkUserForLogin(username, password){
        const userProfile = await User.findOne({ where: { username: username } })
        let result
        // Если он есть то сравниваем пароли
        if(userProfile != null){
            const checkPassUser = checkUserPassword(userProfile.hashPassword, password)
            console.log(checkPassUser)
            if(checkPassUser){
                // После прождения всех этих операция, показываем пользователю новую страницу     
                const token = generateAccessToken('user', 'user')
                // return res.render('login-success', {token, username})
                result = {token, username}
            } else{
                result = 'error'
                // return res.status(400).json({message: "Ошибка при авторизации, введен неверный пароль"})
            }
        }
        return result
    }

    async  getDirector(dep) {
      
        const getDep = await Dep.findAll({
            where: {name_deps : dep}
        })
        return getDep
    }
    
    async  getManager(subd) {
       
        const getSubd = await Subd.findAll({ where: {name_subd: subd}})    
        return getSubd
    }
    
}

module.exports = new SmallScripts()



function checkUserPassword(dbPass, inputPassword){
    // проверяем верный ли пароль ввёл пользователь
    const validPassword = bcrypt.compareSync(inputPassword, dbPass)
    if (!validPassword) {
        return 0
    }
    return 1
}

// Тут ид равен логину
function generateAccessToken(id, roles){
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}