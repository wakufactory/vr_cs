var STAT = {
	stat:{},
	evnt:{},
	poll:function() {
		return new Promise(function(resolve,reject) {
			API.get({cmd:"p"}).catch(function(st){
				reject(st) ;
			}).then(function(d){
				for(var i in STAT.evnt) {
					if(STAT.stat[i]==undefined || STAT.stat[i]!=d.stat[i]) {
						if(STAT.evnt[i]) STAT.evnt[i].call(d.stat,d.stat[i]) ;
					}		
				}
				STAT.stat = d.stat ;
				resolve(STAT.stat) ;
			}) ;
		}) 		
	},
	addEvent:function(ev,cb) {
		if(!Array.isArray(ev)) ev = [ev] ;
		for(let i=0;i<ev.length;i++) STAT.evnt[ev[i]] = cb ;
	}
}
