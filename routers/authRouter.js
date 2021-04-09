const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const {check} = require("express-validator")

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const serveStatic = require('serve-static')
const express = require('express')
const path = require('path')
const app = express()
app.use(serveStatic(path.join('W:\\buscuitProjects\\webDirectory\\public')))

//W:\buscuitProjects\webDirectory\routers
router.post('/registration', controller.registration)
router.post('/login', controller.login)
router.get('/login', async (req, res) =>{
    res.render('login', {
        title: 'Авторизация1',
        stylecss: 'login',
        isActive: 1
    })
})
router.post('/users', controller.checkUserToken)
router.post('/checkUserRole', controller.checkUserRole)
router.post('/changePassword', controller.changePassword)
router.post('/checkJWT', controller.checkUserToken)

module.exports = router
