const express = require('express')
const authRouter = require('./routers/authRouter')
const mainRouter = require('./routers/mainRouter')
const mobileRouter = require('./routers/mobileRouter')
const adminRouter = require('./routers/adminRouter')
const path = require('path')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const serveStatic = require('serve-static')

const { response } = require('express')
const PORT = 5222

const app = express()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.urlencoded({ extended: true }))



app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/", mainRouter)
app.use("/mob", mobileRouter)
app.use("/auth", authRouter)
app.use("/admin", adminRouter)

app.use(express.static(('W:\\buscuitProjects\\webDirectory\\public\\')))
app.use('/static', express.static(('W:\\buscuitProjects\\webDirectory\\public\\')))


// app.use(express.static(('W:\\buscuitProjects\\webDirectory\\public\\')))


const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')



app.use(function (req, res, next) {
  res.redirect('/')
});

app.listen(PORT, () => { console.log(PORT)});
