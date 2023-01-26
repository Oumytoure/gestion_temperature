const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Express APIs
const api = require('./controllers/user.ctrl')

//const app_io = require('./arduino')

mongoose
  .connect('mongodb+srv://mbayang:mbayang07@cluster0.tzug7mq.mongodb.net/Gestion_Utilisateur?retryWrites=true&w=majority')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
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



//<socket io>

/* var io = require('socket.io');


console.log('io');



io.sockets.on('connection', function (socket) {
  socket.on('message', function (data) {
    socket.broadcast.emit('message', data);
    console.log(data);
  });
}); */
// <socket io/>


// arduino
/* var serialport = require('serialport');
const parsers = serialport.parsers;
const parser = new parsers.ReadLine({
  delimeter :"\r\n"

});
var  portArduino = new serialport("COM4",{
  baudRate: 9060,

});
 */
//

