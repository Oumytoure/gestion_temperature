const express = require ('express')
const cors = require('cors')
const bodyParser =  require('body-parser')
const mongoose = require('mongoose')

// Express API
const api = require('./routes/user.routes')

//Connect database
mongoose
  .connect('mongodb+srv://mbayang:mbayang07@cluster0.tzug7mq.mongodb.net/Gestion_Utilisateur?retryWrites=true&w=majority')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })

// Express settings
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cors())
app.use('/api', api)

// Error favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204))

// Definir le PORT
const port = process.env.PORT || 4000

const server = app.listen(port, () => {
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