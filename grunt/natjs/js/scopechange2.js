(function(){
	var a="initial";
	if(a){
		function f(){console.log("1");};

	}
	else{
		function f(){console.log("2");};
	}
	f();
	
})();