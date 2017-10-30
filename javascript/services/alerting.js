(function(){
	let alerting=function($timeout,$interval)
	{
		let currentAlerts=[];
		let alertTypes=["warning","danger","info","success"];
		let lifecounter=null;
		const ALERTLIFE=15000;
		
		let addWarning=function(message)
		{
			addAlert("warning",message);
		}
		
		let addDanger=function(message)
		{
			addAlert("danger",message);
		}
		
		let addInfo=function(message)
		{
			addAlert("info",message);
		}
		
		let addSuccess=function(message)
		{
			addAlert("success",message);
		}
		
		let addAlert=function(type, message)
		{
			let messagePrefix=type.charAt(0).toUpperCase() + type.substr(1).toLowerCase() + ": ";
			if(message)
			{
				let alert={type:type, message:messagePrefix + message, alertLife:ALERTLIFE};
				currentAlerts.push(alert);
				if(currentAlerts.length===1)
				{
					$interval.cancel(lifecounter);
					startLifeCounter();
				}
				$timeout(function(){removeMessage(alert);},ALERTLIFE);				
			}
			else
			{
				addDanger("No message was entered");
			}
		}
		
		let removeMessage=function(alert){
			for (var i=0;i< currentAlerts.length;i++){
				if(currentAlerts[i]===alert)
				{
					currentAlerts.splice(i,1);
					break;
				}
			}
			if(currentAlerts.length===0)
			{
				$interval.cancel(lifecounter);
			}
		}
		
		let decrementLives=function(){
			currentAlerts.map(function(e) { 
				e.alertLife-=1000; 
				return e;
			});
		}
		
		let startLifeCounter=function()
		{
			lifecounter=$interval(decrementLives,1000,ALERTLIFE);
		}
		
		let errorHandler=function(description)
		{
			addDanger(description);
		};
		
		startLifeCounter();
		
		return{
			addAlert:addAlert,
			addWarning:addWarning,
			addDanger:addDanger,
			addInfo:addInfo,
			addSuccess:addSuccess,
			errorHandler:errorHandler,
			currentAlerts:currentAlerts,
			alertTypes:alertTypes,
			removeMessage:removeMessage,
			decrementLives:decrementLives
		}
	}
	let app=angular.module("messenger");
	app.factory("alerting",alerting);
}()
)