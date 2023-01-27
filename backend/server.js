const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Express APIs
const api = require('./controllers/user.ctrl')


//import arduino.js
const api1 = require('./controllers/arduino')



// Express settings
const app = express()

// connexion avec mongo
const url = mongoose    /*mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1 */   /*mongodb+srv://mbayang:mbayang07@cluster0.tzug7mq.mongodb.net/Gestion_Utilisateur?retryWrites=true&w=majority*/
  .connect("mongodb+srv://mbayang:mbayang07@cluster0.tzug7mq.mongodb.net/Gestion_Utilisateur?retryWrites=true&w=majority")
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err, client) => {
    console.error('Error connecting to mongo', err.reason)
  })





//formatage datas 
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cors())

// Serve static resources
app.use('/api', api)

// Error favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204))

// Define PORT
const port = process.env.PORT || 4000

const servers = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Express error handling
app.use((req, res, next) => {
  setImmediate(() => {
    next(new Error('Something went wrong'))
  })
})

app.use(function (err, req, res, next) {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})





