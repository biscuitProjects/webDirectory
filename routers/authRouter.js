const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const {check} = require("express-validator")

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post('/registration', controller.registration)
router.post('/login', controller.login)
router.get('/login', async (req, res) =>{
    res.render('login', {
        title: 'Авторизация',
    })
})
router.post('/users', controller.checkUserToken)
router.post('/changePassword', controller.changePassword)
router.post('/checkJWT', controller.checkUserToken)

module.exports = router
