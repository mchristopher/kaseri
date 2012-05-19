var ws = require('ws').Server, net = require("net"), sys = require('sys');
var phone_connected = false, client_connected = false, vpn_stream = false, phone_stream = false;

var phone_server = new ws({port: 35423, host: '0.0.0.0'});
phone_server.on('connection', function (socket) {

  phone_stream = socket;
  phone_connected = true;
  socket.on("message", function(msg){
    if (vpn_stream) vpn_stream.write(new Buffer(msg, 'base64'));
  });

  socket.on("close", function () {
    sys.puts('Disconnected!');
    phone_connected = false;
    phone_stream = false;
    if (vpn_stream) vpn_stream.end();
  });

  socket.on("error", function(err) {
    sys.puts('Error occured: ' + err);
  });

  sys.puts('Phone connected!');

});

var vpn_client = net.createServer(function (stream) {
  stream.on("connect", function () {
    client_connected = true;
    vpn_stream = stream;
    sys.puts("VPN Client Connected");
  });
  stream.on("data", function (data) {
    if (typeof data == "string") data = new Buffer(data);
    if (phone_stream) phone_stream.send(data.toString('base64'));
  });
  stream.on("end", function () {
    stream.end();
  });
  stream.on("close", function () {
    sys.puts("VPN Client Disconnected");
    client_connected = false;
    vpn_stream = false;
  });
});
vpn_client.listen(35424, "127.0.0.1");
