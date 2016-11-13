var API = {
	_param:function(p) {
		if(!p) return "" ;
		var s = [] ;
		for(var i in p ){
			s.push( i+"="+encodeURIComponent(p[i])) ;
		}
//		console.log(s) ;
		return "?"+s.join("&") ;
	},
	get:function(p) {
		return new Promise(function(resolve,reject) {
			var req = new XMLHttpRequest();
			req.open("get","/api/"+API._param(p),true) ;
			req.responseType = "json" ;
			req.onload = function() {
				if(req.status==200) {
					resolve(req.response) ;
				} else {
					reject(req.status) ;					
				}
			}
			req.onerror = function() {
				reject(req.status) ;
			}
			req.send() ;
		})
	},
	post:function(p,f) {
		return new Promise(function(resolve,reject) {
			var req = new XMLHttpRequest();
			req.open("post","/api/"+API._param(p),true) ;
			req.responseType = "json" ;
			req.setRequestHeader("Content-Type","text/json;charset=UTF-8");
			req.onload = function() {
				if(req.status==200) {
					resolve(req.response) ;
				} else {
					reject(req.status) ;					
				}
			}
			req.send(f) ;
		})
	},
	upload:function(p,data,prog) {
		return new Promise(function(resolve,reject) {
			var req = new XMLHttpRequest();
			req.open("post","/upload/"+API._param(p),true) ;
			req.responseType = "json" ;
			req.onload = function() {
				if(req.status==200) {
					resolve(req.response) ;
				} else {
					reject(req.status) ;					
				}
			}
			if(prog) req.upload.addEventListener("progress", prog,false);
			console.log("send start") ;
			req.send(data) ;
		})
	},
	formJSON:function(f) {
		var fs = f.querySelectorAll("input,select,textarea") ;
		var ret = {} ;
		Array.prototype.forEach.call(fs,function(e) {
			if(e.type=="radio"){
				if(e.checked) ret[e.name] = e.value; 
				else if(ret[e.name]==undefined) ret[e.name] = null ;
			} else if(e.type=="checkbox") {
				if(!ret[e.name]) ret[e.name] = {} ;
				ret[e.name][e.value] = e.checked ;
			} else {
				ret[e.name] = e.value ;
			}
		});
		return ret ;
	}
}