//var usbserial = '/dev/cu.usbmodem1451'; // Pour mon UNO et mon MEGA
//var usbserial = '/dev/cu.usbserial-AL02VFGY'; // Pour mon NANO


var usbserial = '/dev/cu.usbmodem1451';
var usbserial = 'COM4';

var http = require('http');
var fs = require('fs');
var path = require("path");
var url = require("url");

// Gestion des pages HTML
function sendError(errCode, errString, response) {
  response.writeHead(errCode, {"Content-Type": "json/plain"});
  response.write(errString + "\n");
  response.end();
  return;
}

function sendFile(err, file, response) {
  if(err) return sendError(500, err, response);
  response.writeHead(200);
  response.write(file, "binary");
  response.end();
}

function getFile(exists, response, localpath) {
  if(!exists) return sendError(404, '404 Not Found', response);
  fs.readFile(localpath, "binary",
   function(err, file){ sendFile(err, file, response);});
}

function getFilename(request, response) {
  var urlpath = url.parse(request.url).pathname; 
  var localpath = path.join(process.cwd(), urlpath); 
  fs.exists(localpath, function(result) { getFile(result, response, localpath)});
}



// -- socket.io --
// Chargement
var io = require('socket.io');

// -- SerialPort --
// Chargement
var SerialPort = require('serialport');

var arduino = new SerialPort(usbserial, { 
  autoOpen: false, 
  baudRate: 9600,
});

/************ IMPORTANT ********
Pour fonctionner correctement, le fichier 'serialport' @ Users/node_modules/serialport/lib/serialport.js
Ã  Ã©tÃ© modifiÃ© Ã  la ligne 32
baudRate: 115200,

La communication sÃ©rie dans les sketches arduino doit Ãªtre paramÃ¨trÃ©s Ã  115200 bauds : Serial.begin(115200);  
*/


// Overture du port serie
arduino.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message);
  }
  else {
    console.log ("Communication serie Arduino 115200 bauds : Ok")
  }
});


// Requetes
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

arduino.on('data', function (data) {
  let buf = new Buffer(data);
  io.sockets.emit('message', buf.toString('ascii'));
  console.log(buf.toString('ascii'));
  //console.log(buf);
});

server.listen(4000);
console.log("Serveur : Ok");