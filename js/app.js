
/*
	This file kicks off routing.

	Expects 'board' to be defined (see data/gutenberg.js)
	Expects Board react components to be defined (see js/react_board_components.js)
	Expects lightrouter.js lib (see js/lib/lightrouter.js)
*/

var router = new LightRouter({type: 'hash'});
var pageObject = null;

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

router.run();