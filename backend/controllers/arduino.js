
//écoute port arduino
var usbserial = '/dev/ttyUSB0'
//import librairie
var path = require("path");
var fs = require("fs");


// Gestion des pages HTML
function sendError(errCode, errString, response) {
  response.writeHead(errCode, {"Content-Type": "json/plain"});
  response.write(errString + "\n");
  response.end();
  return;
}


//function retour sur le headers
function sendFile(err, file, response) {
  if(err) return sendError(500, err, response);
  response.writeHead(200);
  response.write(file, "binary");
  response.end();
}

//attrapper les erreurs 
function getFile(exists, response, localpath) {
  if(!exists) return sendError(404, '404 Not Found', response);
  fs.readFile(localpath, "binary",
   function(err, file){ sendFile(err, file, response);});
}


//obtenir le nom du fichier qu'on veut lier
function getFilename(request, response) {
  var urlpath = url.parse(request.url).pathname; 
  var localpath = path.join(process.cwd(), urlpath); 
  fs.exists(localpath, function(result) { getFile(result, response, localpath)});
}



// -- socket.io --
var app = "";
var io = require('socket.io')(app);

// -- SerialPort --
// Chargement
const { SerialPort } = require('serialport');
const arduino = new SerialPort({
path: usbserial,
autoOpen: false,
baudRate: 9600,
});


// Overture du port serie
arduino.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message);
  }
  else {
    console.log ("Communication serie Arduino 9600 bauds : Ok")
  }
});


// Requetes de connexion
io.sockets.on('connection', function (socket) {
	// Message Ã  la connexion
  console.log('Connexion socket : Ok');
  socket.emit('message', 'Connexion : Ok');
    // Le serveur reÃ§oit un message" du navigateur    
    socket.on('message', function (msg) {
    	//console.log(msg);
      socket.emit('message', 'Veuillez patienter !');
      arduino.write(msg, function (err) {
		  if (err) {
		  	io.sockets.emit('message', err.message);
		  	return console.log('Error: ', err.message);
		  }
		});
	});
});



//recupere les donnees capteur el les afficher
arduino.on('data', function (data) {
  let buf = new Buffer(data);
  io.sockets.emit('message', buf.toString('ascii'));
  console.log(buf.toString('ascii'));
});//console.log(buf);


console.log("Serveur : Ok");









