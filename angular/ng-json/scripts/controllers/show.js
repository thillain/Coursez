app.controller("jsoncontroller",function($scope,$http){
	//API requires a start date
	var today = new Date();
	$http.jsonp('//builds.apache.org/api/json?pretty=true').success(function(data) {
		var log = [];
		angular.forEach(values, function(value, key){
			this.push(key + ': ' + value);
		}, log);
	});
});
