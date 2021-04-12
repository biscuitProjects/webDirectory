const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("../config/config")
const User = require('../models/user') 
const smallServerScripts = require('../smallServerScripts/smallServerScripts')


// красный цвет в консоли. 
// console.log('\x1b[41m%s\x1b[0m', e)

class authController {
    async registration(req, res) {
        try {
            const {username, password} = req.body
            const role = 'user'
            // хешируем
            const hashPassword = bcrypt.hashSync(password, 7)
            // Тут мы ищем пользователя с таким же логином, если есть выводим ошибку
            const candidate = await User.findOne({ where: { username: username } })
            if(candidate !== null) {
                console.log('\x1b[41m%s\x1b[0m', `Ошибка при регистрации, данный логин уже зарегистрирован            ${username}`)
                return res.status(400).json({message: "Ошибка при регистрации, данный логин уже зарегистрирован"})
            }
            
            User.create({
                username,
                hashPassword,
                role,
            })

            
            return res.json({message: "Пользователь успешно зарегистрирован"})
        } catch (e) {
            console.log('\x1b[41m%s\x1b[0m', e)
            res.status(400).json({message: 'Ошибка при регистрации'})
        }
    }

    async login(req, res) {
        try {
            console.log(req.body)
            const {password} = req.body
            console.log(password)
            // Берем всех пользователей из БД
            const candidate = await User.findAll()
            let indexCandidate; 
            // Тут мы проверяем совподает ли пароль введеный пользователем и пароль в БД
            for (const [index, iterator] of candidate.entries()) {
                const checkPass = bcrypt.compareSync(password, iterator.hashPassword)
                // Если нашли то останавливаем цикл
                if(checkPass === true){
                    indexCandidate = index
                    break
                }
            }
            // Тут я сверяю данные, если нашёл то что нужно, тогда вывожу 
            if(candidate[indexCandidate] === null || candidate[indexCandidate] === undefined) {
                res.status(400).json({message: "Введен неверный пароль"})
            } else{ 
                const username = candidate[indexCandidate].username
                const role = candidate[indexCandidate].role
                const token = smallServerScripts.generateAccessToken(username, role)
                res.json({message:{
                    username, token
                }})
                // res.json({message : {username, token}})
            }

        } catch (e) {
            console.log('\x1b[41m%s\x1b[0m', e)
            res.status(400).json({message: 'Login error'})
        }
    }

    // Тут ид равен имени пользователя
    async changePassword(req, res){
        const {newPass} = req.body
        const token = req.headers.authorization.split(' ')[1]
        const validToken = await smallServerScripts.getDataFromToken(token)
        if(validToken.id){
            try {
                const hashPassword = bcrypt.hashSync(newPass, 7)
                const userProfile = await User.findOne({ where: {username: validToken.id}})
                userProfile.hashPassword = hashPassword
                userProfile.save()
                return res.json({message: "Пароль успешно изменён"})
            } catch (error) {
                console.log('\x1b[41m%s\x1b[0m', 'При изменении пароля произошла ошибка связи с БД.') 
                res.status(400).json({message: 'При изменении пароля произошла ошибка связи с БД.'})
            }

        } else{
            console.log('\x1b[41m%s\x1b[0m', 'Ошибка при передачи токена. Попробуйте выйти из аккаунта и изменить пароль снова.')
            res.status(400).json({message: 'Ошибка при передачи токена. Попробуйте выйти из аккаунта и изменить пароль снова.'})
        } 
    }

    // эту функцию я буду часто использовать для проверки токена пользователя
    // токен я получают от клиента, а на сервере я его проверяю
    async checkUserToken(req, res){
        const token = req.headers.authorization.split(' ')[1]
        const validToken = smallServerScripts.getDataFromToken(token)
        
        if(validToken.code ==  'getDataFromToken'){
            console.log('\x1b[41m%s\x1b[0m', 'Ошибка при проверки токена, перезайдите в аккаунт')
            res.status(400).json({message: 'Ошибка при проверки токена, перезайдите в аккаунт'})
        } else{
            res.json({message: 'true'})
        }
    }   

    async checkUserRole(req, res){
        const token = req.headers.authorization.split(' ')[1]
        const validToken = smallServerScripts.getDataFromToken(token).then((data) =>{
            if(data.code ==  'Error' || data == 'JsonWebTokenError' || data == 'jwt malformed'){  
                console.log('\x1b[41m%s\x1b[0m', 'Ошибка при проверки токена, перезайдите в аккаунт')
                res.json({message: 'Ошибка при проверки токена, перезайдите в аккаунт'})
            } else{
                res.json({message: `${data.roles}`})
            } 
        })


        
    }
}

module.exports = new authController()
