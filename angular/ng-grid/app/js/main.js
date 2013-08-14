/**var app = angular.module('myApp', ['ngGrid']);
app.controller('MyCtrl', function($scope) {
	$scope.myData = [{name: "Moroni", age: 50},
	{name: "Tiancum", age: 43},
	{name: "Jacob", age: 27},
	{name: "Nephi", age: 29},
	{name: "Enos", age: 34}];
	$scope.gridOptions = { data: 'myData' };
});
**/


var app = angular.module('myApp', ['ngGrid']);
app.controller('MyCtrl', function($scope,$http) {
	$http.get('data/app.json').success(function (data) {
		$scope.myData = data;
	});
	$scope.gridOptions = { data: 'myData' };
});
