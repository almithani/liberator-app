
/*
	This file kicks off routing.

	Expects 'shelves' to be defined (see data/example.js)
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
			window.location.hash = '';
		} else {
			window.location.hash = 'book/'+item.id;
		}
	},

	setActiveItemById: function(id) {
		//find item
		var setItem = this.renderItem;
		_.each( this.props.shelves, function(shelf) {
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
				name={this.props.boardname} 
				shelves={this.props.shelves}
				activeItem={this.state.activeItem} 
				setActiveItem={this.setActiveItem} />
		);
	}
});

var router = new LightRouter({type: 'hash'});
var pageObject = null;
var boardname = "Al's Books";

/*  home route */
router.add('', function() {
	pageObject = ReactDOM.render(
	    <Page boardname={boardname} shelves={shelves} />,
	    document.getElementById('content')
	);
	pageObject.setActiveItem(null);
});

/* book reader route */
router.add('book/{id}', function(params){
	pageObject = ReactDOM.render(
	    <Page boardname={boardname} shelves={shelves} />,
	    document.getElementById('content')
	);	
	pageObject.setActiveItemById(params.id);
});

window.onhashchange = function() {
	router.run();
}

router.run();