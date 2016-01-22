/* user singleton */

window.UserFunctions = {

	isLoggedIn: false,

	getCurrentlyLoggedInUser: function(setUserCallback) {
		var sessionid = Cookies.get('sessionid');
		var userFunctions = this;

		nanoajax.ajax({
			url: 'http://api.liberator.me/currentUser/'+'?format=json', 
			method: 'GET',
			withCredentials: true,
		}, function (code, responseText, response) {

			var userJson = JSON.parse(responseText);
			if( code==200 ) {
				if( !_.isEmpty(userJson) ) {
					//user is logged in
					//add the userful functions
					_.merge(userJson, userFunctions);
					userJson.isLoggedIn = true;
					setUserCallback(userJson);
				} else {
					//user is not logged in
					setUserCallback(userFunctions);
				}
			}
		});		
	},

	addItemToUsersList: function(item) {

		nanoajax.ajax({
			url: 'http://api.liberator.me/currentUser/'+this.id+'/addItemTolist/', 
			method: 'POST',
			body: 'book_id='+item.id,
			withCredentials: true
		}, function (code, responseText, response) {

			console.log(responseText)

			var userJson = JSON.parse(responseText);
			if( code==200 ) {

			}
		});	
	},
}