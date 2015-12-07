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

		if( !_.isEmpty(this.props.user) ) {
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
					<a className="header-info" onClick={this.openInfoWindow}>
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
			loggedInUser: null
		};
	},

	setLoggedInUser: function(user) {
		this.setState({
			loggedInUser: user
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
	},

	render: function() {
		if( this.props.children ) {
			return (
				<div>
					<Nav user={this.state.loggedInUser} />
					{this.props.children}
				</div>
			);
		} else {
			return (
				<div>
					<Nav user={this.state.loggedInUser} />
					<div className="loading-gif">
						<img src='img/loading_spinner.gif' alt='loading page' />
					</div>
				</div>
			);
		}
		
	}
});


window.ListingPage = React.createClass({
	getInitialState: function(){
		return { 
			listing: null
		};
	},

	setListing: function(listing) {
		this.setState({
			listing: listing
		});
	},

	getListing: function() {

		var setListing = this.setListing;
		//get the listing (aka front page) from the api
		nanoajax.ajax({
			url: 'http://api.recoroll.com/shelfs/?format=json', 
			method: 'GET',
		}, function (code, responseText, response) {
			if( code==200 ) {
				var responseJson = JSON.parse(responseText);
				setListing(responseJson.results);
			} else {
				console.log('error getting listing');
			}
		});			
	},

	componentWillMount: function() {
		this.getListing();
	},

	render: function() {
		if( !_.isNull(this.state.listing) ) {
			return (
				<Page>
					<Listing
						shelves={this.state.listing} />
				</Page>
			);
		} else {
			return (
				<Page />
			);
		}
	}	
});


window.UserPage = React.createClass({
	getInitialState: function(){
		return { 
			board: null
		};
	},

	setActiveBoard: function(board) {
		this.setState({
			board: board
		});		
	},

	getUser: function(user_id, callback) {
		nanoajax.ajax({
			url: 'http://api.recoroll.com/users/'+user_id+'?format=json', 
			method: 'GET',
			withCredentials: true,
		}, function (code, responseText, response) {

			var userJson = JSON.parse(responseText);
			if( code==200 ) {
				if( !_.isEmpty(userJson) && !_.isNull(userJson.id) ) {
					callback(userJson);
				} else {
					//user is not logged in
				}
			}
		});		
	},

	getUserBoard: function(user_id) {
		//get user's page from the api
		var setBoard = this.setActiveBoard;
		var board = {
			'name': 'fakeboard'
		};

		//get user info
		this.getUser(user_id, function(user) {
			board.user = {
				"name": user.displayName,
				"avatar": user.avatar,
				"tagline": user.tagline,
				"description": user.description
			}
			setBoard(board);
		})

		//get board info
		nanoajax.ajax({
			url: 'http://api.recoroll.com/boards/'+user_id+'?format=json', 
			method: 'GET',
		}, function (code, responseText, response) {
			if( code==200 ) {
				var responseJson = JSON.parse(responseText);
				var boardJson = JSON.parse(responseJson.jsonCache);

				board.id = responseJson.id;
				board.name = boardJson.name;
				board.shelves = boardJson.shelves;
				setBoard(board);
			} else {
				console.log('no user board');
			}
		});		
	},

	componentWillMount: function() {

		if( this.props.initialUserId ) {
			//if we have a user id, grab the user's board
			this.getUserBoard(this.props.initialUserId);
		}		
	},

	render: function() {
		if( !_.isNull(this.state.board) ) {
			return (
				<Page>
					<Board 
						board={this.state.board} />
				</Page>
			);
		} else {
			return (
				<Page />
			);
		}
	}
});


window.ShelfPage = React.createClass({
	getInitialState: function() {
		return {
			shelf: null
		}
	},

	setShelf: function(shelf) {
		this.setState({
			shelf: shelf
		});
	},

	getShelf: function(shelf_id) {
		var setShelf = this.setShelf;
		nanoajax.ajax({
			url: 'http://api.recoroll.com/shelfs/'+shelf_id+'?format=json', 
			method: 'GET',
			withCredentials: true,
		}, function (code, responseText, response) {
			var shelfJson = JSON.parse(responseText);

			if( code==200 ) {
				setShelf(shelfJson);
			}
		});	
	},

	componentWillMount: function() {
		this.getShelf(this.props.shelfId);
	},

	render: function() {
		if( !_.isNull(this.state.shelf) ) {
			return (
				<Page>
					<MasonryShelf 
						title={this.state.shelf.title}
						creator={this.state.shelf.creator} 
						description={this.state.shelf.description}
						items={this.state.shelf.items} />
				</Page>
			);
		} else {
			return (
				<Page />
			);
		}
	}
});

