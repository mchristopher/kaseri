// Fill this in with the host you want to connect to
var remote_host = '1.2.3.4', remote_port = 443;

var ws = require('ws').Server, net = require("net"), sys = require('sys');
var phone_connected = false, client_connected = false;

var phone_server = new ws({port: 808, host: '0.0.0.0'});
phone_server.on('connection', function (socket) {

  phone_connected = true;
  socket.on("message", function(msg){
    if (client) client.write(new Buffer(msg, 'base64'));
  });

  socket.on("close", function () {
    sys.puts('Disconnected!');
    phone_connected = false;
    try {
      client.end();
    } catch (e) {
      sys.puts('Unable to close vpn connection: ' + e);
    }
  });

  socket.on("error", function(err) {
    sys.puts('Error occured: ' + err);
  });
  
  var client = net.createConnection(remote_port, remote_host, function() {
    sys.puts('Connected to server');
  });

  client.on('data', function(data) {
    if (typeof data == "string") data = new Buffer(data);
    if (phone_connected) socket.send(data.toString('base64'));
  });

  client.on('end', function() {
    sys.puts('Disconnected from server');
    try {
      socket.close();
    } catch (e) {
      sys.puts('Unable to close ws connection: ' + e);
    }
  });
  
  client.on('error', function(err) {
    sys.puts('Error occured: ' + err);
  });
  
  sys.puts('Phone connected!');

});
