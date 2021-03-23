const Router = require('express')
const mainRouter = new Router()
const {check} = require("express-validator")
const workerController = require('../controllers/workerController')
// const express = require('express')

// const path = require('path')
// const app = express()
// app.use(express.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, 'public')))

mainRouter.get('/', async (req, res) => {
    res.render('index', {
      title: 'Авторизация',
      isIndex: true,
      stylecss: 'index'
    })
})
// // Получаем департамент из бд
mainRouter.get('/getDeps', workerController.getDeps)
// // Получаем все подразделения департамента
mainRouter.post('/getSubdsFromDep', workerController.getSubdsFromDep)
// Получаем всех сотрудников подразделения
mainRouter.post('/getWorkersFromSubd', workerController.getWorkersFromSubd)
// Поиск сотрудников
mainRouter.post('/searchWorkers', workerController.searchWorkers)

// Поиск сотрудников limit 5
mainRouter.get('/searchWorkersLimit', async (req, res) => {
  res.render('search', {
    title: 'Поиск сотрудника',
    stylecss: 'search'
  })
})
mainRouter.post('/searchWorkersLimit', workerController.searchWorkersLimit)


mainRouter.get('/regNewWorker', async (req, res) => {
  res.render('regNewWorker', {
    title: 'Регистрация нового сотрудника',
    stylecss: 'regNewWorker'
  })
})

mainRouter.get('/search', async (req, res) => {
  res.render('search', {
    title: 'Поиск',
    stylecss: 'search'
  })
})


mainRouter.post('/getEmployeePosts', workerController.getEmployeePosts)


mainRouter.post('/regNewWorker', workerController.createNewWorker)

// проверка дейстует ли токен
mainRouter.post('/us', async (req, res) => {
    const user = req.body
    token = user.token.token
    const isAlive = interactionOverToken.tokenIsAliveCheckInServer(token)
    console.log(3213)
})

module.exports = mainRouter
