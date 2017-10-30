(function() {
	let app = angular.module('messenger');
	let main = function($scope, $interval, $location, $http, alerting) {
	let countDownOperation=null;
	const COUNTDOWN_MAX = 10;
	const INITIAL_USER = "No user entered yet"
    $scope.countdown = COUNTDOWN_MAX;
	$scope.angularUserBase="https://api.github.com/users/";
	$scope.angularUser=INITIAL_USER;		
	$scope.infoVisible=false;
	$scope.infoVisibleLabel="Show More Info";
	
	$scope.setAngularUser=function(user){
		$scope.angularUser=$scope.angularUser===INITIAL_USER?"angular":user;
		$interval.cancel(countDownOperation);
		$scope.countdown = COUNTDOWN_MAX;
		startCountDown();
	}
	
	$scope.setInfoVisibility=function(){
		$scope.infoVisible=$scope.infoVisible?false:true;
		$scope.infoVisibleLabel=$scope.infoVisible?"Hide Information":"Show More Info";
	}
	
	let decrementCountDown=function()
	{
		$scope.countdown-=1;
		if($scope.countdown<1)
		{
			checkApi();
		}
	}
	
	let startCountDown=function(){
		countDownOperation=$interval(decrementCountDown,1000,COUNTDOWN_MAX)
	}
	
	let stopCountDown=function(){
		$interval.cancel(countDownOperation);
		$scope.countdown = null;
	}
	
	let checkApi=function(){
		$http.get($scope.angularUserBase + $scope.angularUser)
		.then( function(){
			alerting.addSuccess("Success: Angular User '"+$scope.angularUser+"' was found!")
			stopCountDown();
		})
		.catch(function(e){
			alerting.errorHandler("No user called '"+$scope.angularUser +"' was found.");
			stopCountDown();
		});
	}
	
	checkApi();
	startCountDown();
  }
  app.controller('maincontroller', ["$scope", "$interval", "$location", "$http", "alerting", main]);
}());