const Router = require('express')
const mainRouter = new Router()
const {check} = require("express-validator")
const workerController = require('../controllers/workerController')

const admin = require('firebase-admin');
var serviceAccount = require('../public/webdirectory-993df-firebase-adminsdk-9bip9-cce47bf93e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// const express = require('express')

// const path = require('path')
// const app = express()
// app.use(express.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, 'public')))

mainRouter.get('/', async (req, res) => {
    res.render('offcanvas', {
      title: 'Авторизация',
      isIndex: true,
      stylecss: 'offcanvas'
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


mainRouter.get('/offcanvas', async(req, res) =>{
  res.render('offcanvas.hbs', {
    title: 'test offcanvas',
    stylecss: 'offcanvas'
  })
})

mainRouter.get('/versionVladimir', async(req, res) =>{
  res.render('versionVladimir.hbs', {
    title: 'test versionVladimir',
    stylecss: 'versionVladimir'
  })
})


// проверка дейстует ли токен
mainRouter.post('/test', async (req, res) => {

  try {
    
  // This registration token comes from the client FCM SDKs.
    var registrationToken = 'cPrNBxNfx7Al4Na-GFnsId:APA91bEDffD8t0sqP1HT44QQQC5R9LO_CjJ7xAWhVm5U3n3e-tkUDBNNjuIuDonSMHlaKiYBVEDsg7pfnwj33BkPtPEcToqIs6PNTVQXn5z0-coPkb9SrNT2B66zYOv66pGw2ocnI0nZ';

    var message = {
      notification: {
        title: 'hello',
        body: 'hello2'
      },
      data: {
        score: '850',
        time: '2:45'
      },
      token: registrationToken
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    admin.messaging().send(message)
      .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Successfully sent message----------------');
        console.log(error);
    });
    res.json({message:"3123131"})

  } catch (error) {
    res.json({message:"errr"})
  }
})

module.exports = mainRouter
