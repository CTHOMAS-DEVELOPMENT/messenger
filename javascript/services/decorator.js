(
function(){
	let exceptionHandler=function($provide) {
		$provide.decorator("$exceptionHandler", function ($delegate,$injector){
			return function (exception, cause) {
				$delegate(exception, cause);
				let alerting = $injector.get("alerting");
				alerting.addDanger(exception.message);
			};
		})
	}
	let app=angular.module("messenger");
	app.config(exceptionHandler);
}()
)