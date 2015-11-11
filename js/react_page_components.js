window.Nav = React.createClass({
	getInitialState: function(){
		return { 
			showInfoWindow: false,
		};
	},	

	openInfoWindow: function() {
		this.setState({
			showInfoWindow: true
		});
	},

	closeInfoWindow: function() {
		this.setState({
			showInfoWindow: false
		});
	},

	render: function() {
		var lightbox = '';
		if( this.state.showInfoWindow==true ) {
			lightbox = <AboutLightbox
							closeWindow={this.closeInfoWindow} />;
		}

		return(
			<div>
				<div id="header">
					<a href="#" className="header-brand">Liberator</a>
					<a href="#" className="header-info" onClick={this.openInfoWindow}>
						<img src="img/entypo/info-with-circle.svg" className="svg-inject" alt="about liberator" />
					</a>
				</div>
				{lightbox}
			</div>
		);	
	}
});

/*
	Page react component is reponsible for page-level state incl. url 
*/
window.Page = React.createClass({
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
			this.props.router.run();
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

	componentDidMount: function() {
		//inject svg
		var mySVGsToInject = document.querySelectorAll('img.svg-inject');
		SVGInjector(mySVGsToInject);		
	},

	renderItem: function(item) {
		this.setState({
			activeItem: item 
		});
	},

	render: function() {
		return(
			<div>
				<Nav />
				<Board 
					board={this.props.board}
					activeItem={this.state.activeItem} 
					setActiveItem={this.setActiveItem} />
			</div>
		);
	}
});