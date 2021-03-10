const express = require('express')
const authRouter = require('./routers/authRouter')
const mainRouter = require('./routers/mainRouter')
const path = require('path')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const { response } = require('express')
const PORT = 5000

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/", mainRouter)
app.use("/auth", authRouter)


const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
  res.status(404).send("Not Found")
});

app.listen(PORT, () => { console.log(PORT)});