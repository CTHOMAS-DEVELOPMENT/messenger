(
function(){
	
	var errorProneController=function( alerting ){
		let model=this;
		model.alertTypes=alerting.alertTypes;
		model.alertType=alerting.alertTypes[0];
		model.alertMessage="";

		model.createAlert=function()
		{
			alerting.addAlert(model.alertType, model.alertMessage)
			model.alertType=alerting.alertTypes[0];
			model.alertMessage="";
		}
		model.throwException=function()
		{
			throw new Error("Something went really wrong");
		}
	}
		let app=angular.module("messenger");
		app.controller("errorProneController",errorProneController);
	}()
)