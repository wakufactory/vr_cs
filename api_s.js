
//API implementation
var fs = require('fs') ;
var stat ={} ;
module.exports.process = function(q,cb) {
	var ret ;
	switch(q.GET.cmd) {
		case "p":
			cb({'stat':stat}) ;
			break ;
		case "set":
			for(i in q.GET) {
				stat[i] = q.GET[i] ;
			}
			cb({'stat':stat}) ;
			break ;
	}
}