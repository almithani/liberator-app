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
		var userDOM = 	<div className="header-user">
							<div className="user-image-frame" style={bgStyle}></div>
						</div>;

		if( !_.isNull(this.props.user) ) {
			bgStyle = { backgroundImage: "url("+this.props.user.avatar+")" };
			var href = "#user/"+this.props.user.user.id;
			userDOM = 	<a className="header-user" href={href} >
							<div className="header-user-username">{this.props.user.displayName}</div>
							<div className="user-image-frame" style={bgStyle}></div>
						</a>;
		}


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
			board: null,
			prevUrl: '#'
		};
	},

	setLoggedInUser: function(user) {
		this.setState({
			loggedInUser: user
		});
	},

	setActiveBoard: function(board) {
		this.setState({
			board: board
		});		
	},

	setActiveItem: function(item) {
		if( _.isEmpty(item) ) {
			this.setState({
				activeItem: null 
			});
		} else {
			this.setState({
				activeItem: item
			});			
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

	getUserBoard: function(user_id) {
		//get user's page from the api
		var setBoard = this.setActiveBoard;
		nanoajax.ajax({
			url: 'http://api.recoroll.com/boards/'+user_id+'?format=json', 
			method: 'GET',
		}, function (code, responseText, response) {
			if( code==200 ) {
				var responseJson = JSON.parse(responseText);
				var boardJson = JSON.parse(responseJson.jsonCache);
				boardJson.id = responseJson.id;
				setBoard(boardJson);
			} else {
				console.log('no user board');
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
		var setUser = this.setLoggedInUser;
		nanoajax.ajax({
			url: 'http://api.recoroll.com/currentUser/'+'?format=json', 
			method: 'GET',
			withCredentials: true,
		}, function (code, responseText, response) {

			var userJson = JSON.parse(responseText);
			if( code==200 ) {
				if( !_.isNull(userJson.id) ) {
					//user is logged in
					setUser(userJson);
				} else {
					//user is not logged in
				}
			}
		});

		//if we have a user id, grab the user's board
		if( this.props.initialUserId ) {
			this.getUserBoard(this.props.initialUserId);
		}		
	},

	componentWillReceiveProps: function(nextProps) {
		//if we have a user id, grab the user's board
		if( nextProps.initialUserId ) {
			this.getUserBoard(nextProps.initialUserId);
		} else {
			this.setActiveBoard(null);			
		}	
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
					board={this.state.board}
					activeItem={this.state.activeItem} 
					setActiveItem={this.setActiveItem} />
			</div>
		);
	}
});