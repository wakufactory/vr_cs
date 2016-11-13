var STAT = {
	stat:{},
	evnt:{},
	poll:function() {
		return new Promise(function(resolve,reject) {
			API.get({cmd:"p"}).catch(function(st){
				reject(st) ;
			}).then(function(d){
				for(var i in STAT.evnt) {
					if(STAT.stat[i]!=d.stat[i]) {
						STAT.evnt[i](d.stat[i]) ;
					}		
				}
				STAT.stat = d.stat ;
				resolve(STAT.stat) ;
			}) ;
		}) 		
	},
	addEvent:function(ev,cb) {
		STAT.evnt[ev] = cb ;
	}
}
