(function() {
  var app = angular.module('messenger', ["ngRoute"]);

	app.config(function($routeProvider){
		
		$routeProvider
		.when("/main",{
			templateUrl:"templates/main.html",
			controller:"maincontroller"
		})
		.otherwise({redirectTo:"/main"});
	});
}());
