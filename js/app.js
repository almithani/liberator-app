
/*
	This file kicks off routing.

	Expects 'board' to be defined (see data/gutenberg.js)
	Expects Board react components to be defined (see js/react_board_components.js)
	Expects lightrouter.js lib (see js/lib/lightrouter.js)
*/

var router = new LightRouter({type: 'hash'});
var pageObject = null;
var board = null;

/*  home route */
router.add('', function() {
	pageObject = ReactDOM.render(
	    <Page board={board} router={router} />,
	    document.getElementById('content')
	);
	pageObject.setActiveItem(null);
});

/* book reader route */
router.add('book/{id}', function(params){
	pageObject = ReactDOM.render(
	    <Page board={board} router={router} />,
	    document.getElementById('content')
	);	
	pageObject.setActiveItemById(params.id);
});

/* user shelf route */
router.add('user/{id}', function(params){

	//get user's page from the api
	nanoajax.ajax({
		url: 'http://api.recoroll.com/boards/'+params.id+'?format=json', 
		method: 'GET',
	}, function (code, responseText, response) {
		if( code==200 ) {
			var responseJson = JSON.parse(responseText);
			var boardJson = JSON.parse(responseJson.jsonCache);
			boardJson.id = responseJson.id;
			pageObject = ReactDOM.render(
	    		<Page board={boardJson} router={router} />,
	    		document.getElementById('content')
			);
		}
	});
});

router.run();