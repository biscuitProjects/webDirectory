const Router = require('express')
const adminRouter = new Router()
const {check} = require("express-validator")
const workerController = require('../controllers/workerController')
const adminController = require('../controllers/adminController')


// Нужно для получени всех директор из БД
adminRouter.post('/getDirectors', adminController.getDirectors)

adminRouter.get('/regNewWorker', async (req, res) => {
  res.render('regNew/regNewWorker', {
    title: 'Регистрация нового сотрудника',
    stylecss: 'regs',
    needAdminRole: 1
  })
})


adminRouter.get('/regNewDep', async(req, res) =>{
  res.render('regNew/regNewDep', {
    title: 'Регистрация департамента',
    stylecss: 'regs'
  })
})

adminRouter.get('/regNewSubd', async(req, res) =>{
  res.render('regNew/regNewSubd', {
    title: 'Регистрация подразделения',
    stylecss: 'regs'
  })
})

adminRouter.get('/regNewEmployeePost', async(req, res) =>{
  res.render('regNew/regNewEmployeePost', {
    title: 'Регистрация подразделения',
    stylecss: 'regs'
  })
})

  

  





adminRouter.post('/regNewWorker', workerController.createNewWorker)














const admin = require('firebase-admin');
var serviceAccount = require('../webdirectory-993df-firebase-adminsdk-9bip9-cce47bf93e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// тестовый запрос, для push
adminRouter.post('/test', async (req, res) => {

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

module.exports = adminRouter
