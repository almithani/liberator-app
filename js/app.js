
/*
	This file kicks off routing.

	Expects 'shelves' to be defined (see data/example.js)
	Expects Board react components to be defined (see js/react_board_components.js)
	Expects lightrouter.js lib (see js/lib/lightrouter.js)
*/

var router = new LightRouter({type: 'hash'});
var boardObject = null;
var boardname = "Al's Books";

router.add('', function() {
	boardObject = ReactDOM.render(
	    <Board name={boardname} shelves={shelves} />,
	    document.getElementById('content')
	);
});

router.add('book/{id}', function(params){
	boardObject = ReactDOM.render(
	    <Board name={boardname} shelves={shelves} />,
	    document.getElementById('content')
	);	
	boardObject.setActiveItemById(params.id);
});

router.run();