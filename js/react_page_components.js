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

		var bgStyle = { backgroundImage: "url(img/entypo/add-user.svg)" };
		var username = '';
		if( !_.isNull(this.props.user) ) {
			bgStyle = { backgroundImage: "url(img/entypo/user.svg)" };
			username = this.props.user.username;
		}
		var userDOM = 	<div className="header-user">
							<div className="header-user-username">{username}</div>
							<div className="user-image-frame" style={bgStyle}></div>
						</div>;

		return(
			<div>
				<div id="header">
					<a href="#" className="header-brand">Liberator</a>
					{userDOM}
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
			loggedInUser: null,
		};
	},

	setActiveUser: function(user) {
		this.setState({
			loggedInUser: user
		});
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

	componentWillMount: function() {
		//search for a logged in user
		var sessionid = Cookies.get('sessionid');
		var setUser = this.setActiveUser;
		nanoajax.ajax({
			url: 'http://api.recoroll.com/currentUser/'+'?format=json', 
			method: 'GET',
			withCredentials: true,
		}, function (code, responseText, response) {

			var userJson = JSON.parse(responseText);
			if( code==200 ) {
				console.log(userJson);
				if( !_.isNull(userJson.id) ) {
					//user is logged in
					setUser(userJson);
				} else {
					//user is not logged in
				}
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
			<div>
				<Nav user={this.state.loggedInUser} />
				<Board 
					board={this.props.board}
					activeItem={this.state.activeItem} 
					setActiveItem={this.setActiveItem} />
			</div>
		);
	}
});