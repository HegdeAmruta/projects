//*imported Modules
const express = require('express')
const cors = require('cors')

const app = express()

const mongoose = require('mongoose')

//custom routes
const userSignUpRoute = require('./routes/signup')

const userLogInRoute = require('./routes/login')

process.on('uncaughtException', (e) => {
  console.log('WE GOT AN UNCAUGHT EXCEPTION')
  console.log(e)

  process.exit(1)
})
process.on('unhandledRejection', (e) => {
  console.log('WE GOT AN UNHANDLED PROMISE')
  console.log(e)

  process.exit(1)
})

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//custom routes
app.use('/signup', userSignUpRoute)

app.use('/login', userLogInRoute)

//TODO: need to separate this Database  module

const dataBaseUrl = 'mongodb://localhost:27017/employee' //! need to be saved in ENV-VAR
mongoose
  .connect(dataBaseUrl)
  .then(() => {
    console.log(`connected to ${dataBaseUrl}`)
  })
  .catch((err) => {
    console.log('error encounterd', err)
  })

app.get('/', (req, res) => {
  res.send('home.html')
})

const port = process.env.PORT || 8000
app.listen(port, (error) => {
  if (error) console.log(error)

  console.log(`listing on port ${port}...`)
})
