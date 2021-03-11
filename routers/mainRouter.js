const Router = require('express')
const mainRouter = new Router()
const {check} = require("express-validator")
const workerController = require('../controllers/workerController')


mainRouter.get('/', async (req, res) => {
    res.render('index', {
      title: 'Авторизация',
      isIndex: true,
    })
})
// // Получаем департамент из бд
mainRouter.get('/getDeps', workerController.getDeps)
// // Получаем все подразделения департамента
mainRouter.post('/getSubdsFromDep/', workerController.getSubdsFromDep)
// Получаем всех сотрудников подразделения
mainRouter.post('/getWorkersFromSubd/', workerController.getWorkersFromSubd)
// Поиск сотрудников
mainRouter.post('/searchWorkers/', workerController.searchWorkers)


// проверка дейстует ли токен
mainRouter.post('/us', async (req, res) => {
    const user = req.body
    token = user.token.token
    const isAlive = interactionOverToken.tokenIsAliveCheckInServer(token)
    console.log(3213)
})

module.exports = mainRouter
