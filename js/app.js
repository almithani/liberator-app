
/*
	This file kicks off routing.

	Expects Board react components to be defined (see js/react_board_components.js)
	Expects lightrouter.js lib (see js/lib/lightrouter.js)
*/

var router = new LightRouter({type: 'hash'});
var pageObject = null;
var board = null;

/*  home route */
router.add('', function() {
	pageObject = ReactDOM.render(
	    <ListingPage router={router} />,
	    document.getElementById('content')
	);
	//pageObject.setActiveItem(null);
});

/* user shelf route */
router.add('user/{id}', function(params){
	pageObject = ReactDOM.render(
		<UserPage initialUserId={params.id} router={router} />,
		document.getElementById('content')
	);
});

router.run();

window.onhashchange = function(e) {
   //this is for links - if you don't want to trigger a repaint, use history.pushState
   console.log('run router');
   router.run();
};