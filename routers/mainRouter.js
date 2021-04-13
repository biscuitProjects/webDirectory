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
      title: 'Справочник',
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
// Страница поиска сотрудников
mainRouter.post('/searchWorkersLimit', workerController.searchWorkersLimit)



mainRouter.get('/search', async (req, res) => {
  res.render('search', {
    title: 'Поиск',
    stylecss: 'search'
  })
})


mainRouter.post('/getEmployeePosts', workerController.getEmployeePosts)


// Удалить?
mainRouter.get('/offcanvas', async(req, res) =>{
  res.render('offcanvas.hbs', {
    title: 'test offcanvas',
    stylecss: 'offcanvas'
  })
})


// Удалить?
mainRouter.get('/versionVladimir', async(req, res) =>{
  res.render('versionVladimir.hbs', {
    title: 'test versionVladimir',
    stylecss: 'versionVladimir'
  })
})

mainRouter.get('/helpme', async(req, res) =>{
  res.render('helpme',{
    title: 'Помощь',
    stylecss: 'helpme'
  })
})

mainRouter.get('/calendar', async(req, res) =>{
  res.render('calendar', {
    title: 'Календарь',
    stylecss: 'calendar'
  })
})

// Компонены

mainRouter.get('/getNav', )


module.exports = mainRouter
