const express = require('express');
const app = express();
const router = express.Router();
const WebSocket = require('ws');

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
      credentials: false
    }
  });

  app.get('/', (req,res) => {
    res.sendFile(__dirname + 'index.html')
  });

  app.use(express.static('public'));

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
   console.log('Températures et Humidités:');
   let buf = data.split('/');
   console.log(buf);

   const temperature = parseInt(data.slice(0, 2)); 
   const humidity = parseInt(data.slice(6, 9));
   io.emit('temperature', temperature);
   io.emit('humidity', humidity);

  io.emit('data', {"temperature": buf[0], "humidite": buf[1]});  // envoi de la température et l'humidité avec emit

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
    if ((heur == 08 && min == 00 && sec == 00) || (heur == 12 && min == 00 && sec == 00) || (heur == 19 && min == 00 && sec == 00)) {
        
        //l'objet qui contient la temperature, humidite et la date
        var tempEtHum = { 'Temperature': buf[0], 'Humidité': buf[1], 'Date': heureEtDate, 'Heure': heureInsertion };
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

app.get('', (req, res) => {
    //Fonction pour la recuperation de la moyenne temperature
    MongoClient.connect(Url, { useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var database = db.db("gest_temp");
        assert.equal(null, err);
        //Declaration des variables 
        var tempDixNeufHeure;
        var humDixNeufHeure;
        var tempDouzeHeure;
        var humDouzeHeure;
        var tempHuitHeure;
        var humHuitHeure;
        var moyH;
        var moyT;
        //fin
        var col = database.collection('temphums');
        col.aggregate([{ $group: { _id: "_id", moyeTemp: { $avg: "$Temperature" } } }]).toArray(function(err, items) {
            console.log(items);
            moyT = items[0].moyeTemp;
            console.log(moyT);
        });
        //Moyenne humidite donnees
        col.aggregate([{ $group: { _id: "_id", moyeHum: { $avg: "$Humidity" } } }]).toArray(function(err, humi) {
            console.log(humi);
            moyH = humi[0].moyeHum;
            console.log(moyH);
        }); 
        //recuperation de la temperature de 8h
        col.find({ Heure: "08:00:00" }, { Temperature: 1 }).toArray(function(err, tem1) {
            console.log(tem1);
            tempHuitHeure = tem1[0].Temperature;
            humHuitHeure = tem1[0].Humidity;
            console.log("Temperature Huit heure:\t" + tempHuitHeure);
            console.log("Humidite Huit heure :\t" + humHuitHeure);
        });
        //recuperation de la temperature de 12h
        col.find({ Heure: "12:00:00" }, { Temperature: 1 }).toArray(function(err, tem2) {
            console.log(tem2);
            tempDouzeHeure = tem2[0].Temperature;
            humDouzeHeure = tem2[0].Humidity;
            console.log("Temperature Douze heure:\t" + tempDouzeHeure);
            console.log("Humidite Douze heure :\t" + humDouzeHeure);
        });
        //recuperation de la temperature de 19h
        col.find({ Heure: "19:00:00" }, { Temperature: 1 }).toArray(function(err, tem3) {
            console.log(tem3);
            tempDixNeufHeure = tem3[0].Temperature;
            humDixNeufHeure = tem3[0].Humidity;
            console.log("Temperature Dix neuf heure:\t" + tempDixNeufHeure);
            console.log("Humidite Dix neuf heure :\t" + humDixNeufHeure);

            var affiche = [{
                MoyTemperature: moyT,
                MoyHumidite: moyH,
                TempHuitHeure: tempHuitHeure,
                HumiditeHuitHeure: humHuitHeure,
                TemperatureDouzeHeure: tempDouzeHeure,
                HumiditeDouzeHeure: humDouzeHeure,
                TemperatureDixNeufHeure: tempDixNeufHeure,
                HumiditeDixNeufHeure: humDixNeufHeure
            }];
            console.log("Informations récupèrées = \t" + affiche);
            res.render('index', { recup: affiche });
            db.close();
        });

    });


});

//Si on arrive pas a lire sur le port, on affiche l'erreur concernee
port.on('error', function(err) {
    console.log(err);
});


app.use("/", router);