"use strict";

window.Nav = React.createClass({
	displayName: "Nav",

	getInitialState: function getInitialState() {
		return {
			showInfoWindow: false
		};
	},

	openInfoWindow: function openInfoWindow() {
		this.setState({
			showInfoWindow: true
		});
	},

	closeInfoWindow: function closeInfoWindow() {
		this.setState({
			showInfoWindow: false
		});
	},

	render: function render() {
		var lightbox = '';
		if (this.state.showInfoWindow == true) {
			lightbox = React.createElement(AboutLightbox, {
				closeWindow: this.closeInfoWindow });
		}

		var bgStyle = { backgroundImage: "url(img/entypo/add-user.svg)" };
		var userDOM = React.createElement(
			"div",
			{ className: "header-user" },
			React.createElement("div", { className: "user-image-frame", style: bgStyle })
		);

		if (!_.isEmpty(this.props.user)) {
			bgStyle = { backgroundImage: "url(" + this.props.user.avatar + ")" };
			var href = "#user/" + this.props.user.user.id;
			userDOM = React.createElement(
				"a",
				{ className: "header-user", href: href },
				React.createElement(
					"div",
					{ className: "header-user-username" },
					this.props.user.displayName
				),
				React.createElement("div", { className: "user-image-frame", style: bgStyle })
			);
		}

		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ id: "header" },
				React.createElement(
					"a",
					{ href: "#", className: "header-brand" },
					"Liberator"
				),
				userDOM,
				React.createElement(
					"a",
					{ className: "header-cta", href: "#signup/" },
					"Become Inspired"
				),
				React.createElement(
					"a",
					{ className: "header-info", onClick: this.openInfoWindow },
					React.createElement("img", { src: "img/entypo/info-with-circle.svg", className: "svg-inject", alt: "about liberator" })
				)
			),
			lightbox
		);
	}
});

/*
	Page react component is reponsible for page-level state incl. url 
*/
window.Page = React.createClass({
	displayName: "Page",

	getInitialState: function getInitialState() {
		return {
			loggedInUser: null
		};
	},

	setLoggedInUser: function setLoggedInUser(user) {
		this.setState({
			loggedInUser: user
		});
	},

	componentDidMount: function componentDidMount() {
		//inject svg
		var mySVGsToInject = document.querySelectorAll('img.svg-inject');
		SVGInjector(mySVGsToInject);
	},

	componentDidUpdate: function componentDidUpdate() {
		//inject svg
		var mySVGsToInject = document.querySelectorAll('img.svg-inject');
		SVGInjector(mySVGsToInject);
	},

	componentWillMount: function componentWillMount() {
		//search for a logged in user
		var sessionid = Cookies.get('sessionid');
		var setUser = this.setLoggedInUser;
		nanoajax.ajax({
			url: 'http://api.liberator.me/currentUser/' + '?format=json',
			method: 'GET',
			withCredentials: true
		}, function (code, responseText, response) {

			var userJson = JSON.parse(responseText);
			if (code == 200) {
				if (!_.isNull(userJson.id)) {
					//user is logged in
					setUser(userJson);
				} else {
					//user is not logged in
				}
			}
		});
	},

	render: function render() {
		if (this.props.children) {
			return React.createElement(
				"div",
				null,
				React.createElement(Nav, { user: this.state.loggedInUser }),
				this.props.children
			);
		} else {
			return React.createElement(
				"div",
				null,
				React.createElement(Nav, { user: this.state.loggedInUser }),
				React.createElement(
					"div",
					{ className: "loading-gif" },
					React.createElement("img", { src: "img/loading_spinner.gif", alt: "loading page" })
				)
			);
		}
	}
});

window.ListingPage = React.createClass({
	displayName: "ListingPage",

	nextPage: "",

	getInitialState: function getInitialState() {
		return {
			listing: null
		};
	},

	setListing: function setListing(jsonResponse) {
		this.nextPage = jsonResponse.next;
		this.setState({
			listing: jsonResponse.results
		});
	},

	getListing: function getListing() {

		var setListing = this.setListing;

		//get the listing (aka front page) from the api
		nanoajax.ajax({
			url: 'http://api.liberator.me/shelfs/?format=json',
			method: 'GET'
		}, function (code, responseText, response) {
			if (code == 200) {
				var responseJson = JSON.parse(responseText);
				setListing(responseJson);
			} else {
				console.log('error getting listing');
			}
		});
	},

	getNextPage: function getNextPage() {

		var setListing = this.setListing;
		var curListing = this.state.listing;

		//get the listing (aka front page) from the api
		nanoajax.ajax({
			url: this.nextPage,
			method: 'GET'
		}, function (code, responseText, response) {
			if (code == 200) {
				var responseJson = JSON.parse(responseText);
				var newListing = curListing.concat(responseJson.results);
				responseJson.results = newListing;

				setListing(responseJson);
			} else {
				console.log('error getting listing');
			}
		});
	},

	componentWillMount: function componentWillMount() {
		this.getListing();
	},

	render: function render() {
		if (!_.isNull(this.state.listing)) {

			var nextBtn = "";
			if (!_.isNull(this.nextPage)) {
				nextBtn = React.createElement(
					"a",
					{ className: "btn-next", onClick: this.getNextPage },
					"Load More"
				);
			}

			return React.createElement(
				Page,
				null,
				React.createElement(Listing, {
					shelves: this.state.listing }),
				nextBtn
			);
		} else {
			return React.createElement(Page, null);
		}
	}
});

window.UserPage = React.createClass({
	displayName: "UserPage",

	getInitialState: function getInitialState() {
		return {
			board: null
		};
	},

	setActiveBoard: function setActiveBoard(board) {
		this.setState({
			board: board
		});
	},

	getUser: function getUser(user_id, callback) {
		nanoajax.ajax({
			url: 'http://api.liberator.me/users/' + user_id + '?format=json',
			method: 'GET',
			withCredentials: true
		}, function (code, responseText, response) {

			var userJson = JSON.parse(responseText);
			if (code == 200) {
				if (!_.isEmpty(userJson) && !_.isNull(userJson.id)) {
					callback(userJson);
				} else {
					//user is not logged in
				}
			}
		});
	},

	getUserBoard: function getUserBoard(user_id) {
		//get user's page from the api
		var setBoard = this.setActiveBoard;
		var board = {
			'name': 'fakeboard'
		};

		//get user info
		this.getUser(user_id, function (user) {
			board.user = {
				"name": user.displayName,
				"avatar": user.avatar,
				"tagline": user.tagline,
				"description": user.description
			};
			setBoard(board);
		});

		//get board info
		nanoajax.ajax({
			url: 'http://api.liberator.me/boards/' + user_id + '?format=json',
			method: 'GET'
		}, function (code, responseText, response) {
			if (code == 200) {
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

	componentWillMount: function componentWillMount() {

		if (this.props.initialUserId) {
			//if we have a user id, grab the user's board
			this.getUserBoard(this.props.initialUserId);
		}
	},

	render: function render() {
		if (!_.isNull(this.state.board)) {
			return React.createElement(
				Page,
				null,
				React.createElement(Board, {
					board: this.state.board })
			);
		} else {
			return React.createElement(Page, null);
		}
	}
});

window.ShelfPage = React.createClass({
	displayName: "ShelfPage",

	getInitialState: function getInitialState() {
		return {
			shelf: null
		};
	},

	setShelf: function setShelf(shelf) {
		this.setState({
			shelf: shelf
		});
	},

	getShelf: function getShelf(shelf_id) {
		var setShelf = this.setShelf;
		nanoajax.ajax({
			url: 'http://api.liberator.me/shelfs/' + shelf_id + '/?format=json',
			method: 'GET',
			withCredentials: true
		}, function (code, responseText, response) {
			var shelfJson = JSON.parse(responseText);

			if (code == 200) {
				setShelf(shelfJson);
			}
		});
	},

	componentWillMount: function componentWillMount() {
		this.getShelf(this.props.shelfId);
	},

	render: function render() {
		if (!_.isNull(this.state.shelf)) {
			return React.createElement(
				Page,
				null,
				React.createElement(MasonryShelf, {
					title: this.state.shelf.title,
					creator: this.state.shelf.creator,
					description: this.state.shelf.description,
					items: this.state.shelf.items })
			);
		} else {
			return React.createElement(Page, null);
		}
	}
});

window.SignUpPage = React.createClass({
	displayName: "SignUpPage",

	render: function render() {
		return React.createElement(
			Page,
			null,
			React.createElement(
				"div",
				{ className: "email-signup-page" },
				React.createElement(
					"div",
					{ className: "email-signup-promo" },
					React.createElement("img", { className: "email-signup-promo-image", src: "img/weekly-email.png", alt: "Preview of our email updates" }),
					React.createElement("div", { className: "shadow" })
				),
				React.createElement(
					"div",
					{ className: "email-signup-benefits" },
					React.createElement(
						"h1",
						null,
						"Inspiration.",
						React.createElement("br", null),
						"Directly from inspiring people"
					),
					React.createElement(
						"p",
						null,
						"Artists and leaders live their lives seeking inspiration."
					),
					React.createElement(
						"p",
						null,
						"In our email, we share the books that motivate people to achieve extraordinary things.  Sign up now to find your muse."
					),
					React.createElement(EmailSignupForm, null)
				),
				React.createElement(
					"div",
					{ className: "email-signup-promo email-signup-promo-mobile" },
					React.createElement("img", { className: "email-signup-promo-image", src: "img/weekly-email.png", alt: "Preview of our email updates" }),
					React.createElement("div", { className: "shadow" })
				)
			)
		);
	}
});