const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors')
const Model = require('./models')
const mongoose = require('mongoose');

mongoose
  .connect('mongodb+srv://mbayang:mbayang07@cluster0.tzug7mq.mongodb.net/Gestion_Utilisateur?retryWrites=true&w=majority')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
      credentials: false
    }
  });

  app.use(cors())

  router.route('/').get((req, res) =>{
    Model.find((error, response) =>{
        if (error) {
            return next(error)
          } else {
            return res.status(200).json(response)
          }
    })
})

app.use("/", router);

  server.listen(3000, function() {
    console.log("Web socket connect port: ws://localhost:%s", 3000)
});



/* ------------------------------------------------------------------------ */

var Url = "mongodb+srv://mbayang:mbayang07@cluster0.tzug7mq.mongodb.net/test"; 

const MongoClient = require('mongodb').MongoClient;
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const port = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 9600 })// Si la vitesse de transmission est de 9600 

// On lit les donnees par ligne telles quelles apparaissent
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
 
parser.on('open', function() {
    console.log('Connexion ouverte');
 });

parser.on('data', function(data) {
   //console.log('Températures et Humidités:');
   let buf = data.split('/');
   console.log(buf);

   const temperature = parseInt(data.slice(0, 2)); 
   const humidity = parseInt(data.slice(3, 5));
   io.emit('temperature', temperature);
   io.emit('humidity', humidity);

  io.emit('data', {"temperature": buf[0], "humidity": buf[1]});  // envoi de la température et l'humidité avec emit

    //calcul de la date et l'heure 
    var datHeure = new Date(); // date
    var min = datHeure.getMinutes();
    var heur = datHeure.getHours(); //heure
    var sec = datHeure.getSeconds(); //secondes
    var mois = datHeure.getDate(); //renvoie le chiffre du jour du mois 
    var numMois = datHeure.getMonth() + 1; //le mois en chiffre
    var laDate = datHeure.getFullYear(); // me renvoie en chiffre l'annee
    if (numMois < 10) { numMois = '0' + numMois; } // si le jour est <10 on affiche 0 devant
    if (mois < 10) { mois = '0' + mois; } // si le mois est <10 on affiche 0 devant
    if (sec < 10) { sec = '0' + sec; }
    if (min < 10) { min = '0' + min; }
    var heureInsertion = heur + ':' + min + ':' + sec;
    var heureEtDate = mois + '/' + numMois + '/' + laDate;

       //Insertion à la base de donénes
    if ((heur == 8 && min == 00 && sec == 00) || (heur == 13&& min == 31 && sec == 00) || (heur == 19 && min == 00 && sec == 00)) {
        //l'objet qui contient la temperature, humidite et la date
        var tempEtHum = { 'Temperature': buf[0], 'Humidity': buf[1], 'Date': heureEtDate, 'Heure': heureInsertion };
        //Connexion a mongodb et insertion Temperature et humidite
        MongoClient.connect(Url, { useUnifiedTopology: true }, function(err, db) {
           console.log('connecté');
            if (err) throw err;
            var database = db.db("Gestion_Utilisateur"); // nom de ma bdd
            database.collection("temphums").insertOne(tempEtHum, function(err, res) {
                if (err) throw err;
                console.log("nouvelle insertion dans la bdd");
                db.close();
            });
        });

    } 
});

//Si on arrive pas a lire sur le port, on affiche l'erreur concernee
port.on('error', function(err) {
    console.log(err);
});