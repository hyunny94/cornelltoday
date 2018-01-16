export const NOTIF_WISHLIST_CHANGED = "notif_wishlist_changed";

var observers = {}; 
let instance = null ; 

class NotificationService {
	constructor(){
		if (!instance) {
			instance = this; 
		}
		return instance; 
	}
 
 // remoober Observer?  need to watch the video one more time to understand this shit 
// observers {Notifname : [wishlist , product] , NotifName2 :[]} 
 	postNotification = (notifName, data) => {
 		let obs = observers[notifName];
 		for (var x = 0; x < obs.length; x++) {
 			var obj = obs[x];
 			obj.callBack(data);
 		}
 	}
	removeObserver = (observer, notifName) =>  {
		var obs = observers[notifName]; 
		if (obs) {
			for ( var x =0 ; x< obs.length; x++) {
				if (observer === obs[x].observer ) {
					obs.splice(x,1); 
					observers[notifName] = obs ; 
					break; 
				}
			}
		}
	}
// why do you need to add the observer in this case? 

	addObserver = (notifName, observer, callBack) => {
		let obs = observers[notifName];
		if (!obs) {
			observers[notifName] = [];
		}
		let obj = {observer: observer, callBack: callBack};
		observers[notifName].push(obj);
	}
}

export default NotificationService;