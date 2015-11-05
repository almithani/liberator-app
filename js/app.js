
/*
	This file kicks off routing.

	Expects 'shelves' to be defined (see data/example.js)
	Expects Board react components to be defined (see js/react_board_components.js)
	Expects lightrouter.js lib (see js/lib/lightrouter.js)
*/

var router = new LightRouter();

router.add('', function() {
	//expects "shelves" to be defined
	var boardname = "Al's Books";

	ReactDOM.render(
	    <Board name={boardname} shelves={shelves} />,
	    document.getElementById('content')
	);
});

router.add('book/{id}', function(id){
	console.log('at book ');
});

router.run();