"use strict";
var server = require('./server.js') ;
var api = require('./api_s.js') ;
var ip = "127.0.0.1" ;
if(process.argv.length>1) ip = process.argv[2] ;

//start server
server.start({
	"address":ip,
	"port":8080,
	"docroot":"./client",
	"api_callback":api.process
}) ;



