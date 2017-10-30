(
function(){
	var alerts=function(alerting){
		return {
				restrict: "AE",
				templateUrl:"templates/alerts.html",
				scope: true,
				controller: function($scope){
					$scope.removeMessage=function(alert)
					{
						alerting.removeMessage(alert);
					}
				},
				link: function (scope) {
					scope.currentAlerts=alerting.currentAlerts;
				}
		};
	}
	let app=angular.module("messenger");
	app.directive("alerts",alerts);
}()
)

