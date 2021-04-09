const Router = require('express')
const mobileRouter = new Router()
const {check} = require("express-validator")
const workerController = require('../controllers/workerController')


mobileRouter.get('/', async (req, res) => {
     res.render('offcanvas', {
          title: 'Справочник',
          isIndex: true,
          stylecss: 'offcanvas'
     })
})



module.exports = mobileRouter
