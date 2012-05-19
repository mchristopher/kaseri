Kaseri
======

Proxy using node, websockets and a mobile phone in-between.

------

Kaseri provides you the tools you need to setup a proxy with an iPhone or Android as a middle-man, effectively allowing you to use your phone as a tethering device so long as you have access to data.

To get started, you'll need a few things:

* A mobile phone that supports Web Sockets & you can connect to via wifi
* An external server to run the VPN script on
* NodeJS
* Something to connect to (I recommend OpenVPN)

You'll need to run vpn_server.js on a remote machine that you can connect to. You will want to modify the first line, which specifies which host and port the server will proxy requests to. This must be a TCP port and it must be accessable from the machine running the vpn_server.js script.

Next, you'll want to setup OpenVPN (or other software of your choice) to tunnel traffic through the proxy. Locally, set the IP to 127.0.0.1 and the port to 35424 (or other port in pc_server.js). Run pc_server.js on your local machine.

Finally, you'll need an HTML page you can open on your phone that will connect to both the VPN server and your PC and blindly pass data between them. Once you have that up and running, connect your OpenVPN client and enjoy your free data access.