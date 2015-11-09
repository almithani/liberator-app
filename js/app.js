
/*
	This file kicks off routing.

	Expects 'board' to be defined (see data/gutenberg.js)
	Expects Board react components to be defined (see js/react_board_components.js)
	Expects lightrouter.js lib (see js/lib/lightrouter.js)
*/

/*
	Page react component is reponsible for page-level state incl. url 
*/
var Page = React.createClass({
	getInitialState: function(){
		return { 
			activeItem: null,
		};
	},

	setActiveItem: function(item) {
		if( _.isEmpty(item) ) {
			this.setState({
				activeItem: null 
			});
			history.pushState(null, null, '#');
		} else {
			history.pushState(null, null, '#book/'+item.id);
			router.run();
		}
	},

	setActiveItemById: function(id) {
		//find item
		var setItem = this.renderItem;
		_.each( this.props.board.shelves, function(shelf) {
			var item = _.find( shelf.items, function(item){
				return item.id == id;
			});

			if( !_.isEmpty(item) ) {
				setItem(item);		
				return false;		
			}
		});
	},	

	renderItem: function(item) {
		this.setState({
			activeItem: item 
		});
	},

	render: function() {
		return(
			<Board 
				board={this.props.board}
				activeItem={this.state.activeItem} 
				setActiveItem={this.setActiveItem} />
		);
	}
});

var router = new LightRouter({type: 'hash'});
var pageObject = null;

/*  home route */
router.add('', function() {
	pageObject = ReactDOM.render(
	    <Page board={board} />,
	    document.getElementById('content')
	);
	pageObject.setActiveItem(null);
});

/* book reader route */
router.add('book/{id}', function(params){
	pageObject = ReactDOM.render(
	    <Page board={board} />,
	    document.getElementById('content')
	);	
	pageObject.setActiveItemById(params.id);
});

router.run();