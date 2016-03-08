"use strict";

window.ItemQuote = React.createClass({
	displayName: "ItemQuote",

	getInitialState: function getInitialState() {
		return {
			isActive: false
		};
	},

	setActive: function setActive() {
		this.setState({
			isActive: true
		});
	},

	setInactive: function setInactive() {
		this.setState({
			isActive: false
		});
	},

	render: function render() {
		var visibleQuote = "";
		var buttonClass = "author-quote action-icon ";
		if (this.state.isActive) {
			visibleQuote = React.createElement(
				"div",
				{ className: "item-quote-content" },
				React.createElement(
					"div",
					{ className: "item-quote-quote" },
					"\"",
					this.props.quote,
					"\""
				),
				React.createElement(
					"div",
					{ className: "item-quote-quoted" },
					"-",
					this.props.quoted
				)
			);
			buttonClass = buttonClass + " active";
		}

		return React.createElement(
			"div",
			{ className: "item-quote" },
			visibleQuote,
			React.createElement(
				"a",
				{ className: buttonClass,
					onMouseEnter: this.setActive,
					onMouseLeave: this.setInactive,
					onTouchStart: this.setActive,
					onTouchCancel: this.setInactive,
					onTouchEnd: this.setInactive },
				React.createElement("img", { src: "img/entypo/message.svg", className: "svg-inject", alt: "why?" })
			)
		);
	}

});

window.Item = React.createClass({
	displayName: "Item",

	getInitialState: function getInitialState() {
		return {
			isActive: false,
			currentCfi: null };
	},

	//cfi is ebook internal index/url/page
	setCfi: function setCfi(newCfi) {
		this.setState({
			currentCfi: newCfi
		});
	},

	deactivateItem: function deactivateItem() {
		this.setState({
			isActive: false
		});
	},

	activateItem: function activateItem() {
		this.setState({
			isActive: true
		});
	},

	render: function render() {
		var lightbox = '';
		if (this.state.isActive) {
			lightbox = React.createElement(BookSummaryLightbox, {
				item: this.props.item,
				avatar: this.props.recommender.avatar,
				closeLightbox: this.deactivateItem });
		}

		var quoteButton = '';
		if (this.props.item.quote) {
			quoteButton = React.createElement(ItemQuote, {
				quote: this.props.item.quote,
				quoted: this.props.recommender.displayName });
		}

		return React.createElement(
			"table",
			{ className: "item" },
			React.createElement(
				"tbody",
				null,
				React.createElement(
					"tr",
					null,
					React.createElement(
						"td",
						{ className: "item-cover" },
						React.createElement("img", { className: "item-cover-img", src: this.props.item.cover, alt: "", onClick: this.activateItem }),
						quoteButton,
						React.createElement(
							"a",
							{ className: "more-info action-icon", onClick: this.activateItem, onTouchStart: this.activateItem },
							React.createElement("img", { src: "img/entypo/dots-three-horizontal.svg", className: "svg-inject", alt: "more info" })
						)
					)
				),
				React.createElement(
					"tr",
					null,
					React.createElement(
						"td",
						{ className: "item-info" },
						React.createElement(
							"div",
							{ className: "item-title" },
							this.props.item.title
						),
						React.createElement(
							"div",
							{ className: "item-author" },
							this.props.item.author
						),
						lightbox
					)
				)
			)
		);
	}
});

window.UserItem = React.createClass({
	displayName: "UserItem",

	render: function render() {
		var bgStyle = { backgroundImage: "url(" + this.props.user.avatar + ")" };

		return React.createElement(
			"div",
			{ className: "item user-item" },
			React.createElement("div", { className: "user-image-frame", style: bgStyle }),
			"recommended by ",
			React.createElement(
				"h3",
				{ className: "user-name" },
				this.props.user.displayName
			),
			React.createElement(
				"h4",
				{ className: "user-tagline" },
				this.props.user.tagline
			)
		);
	}
});

window.Shelf = React.createClass({
	displayName: "Shelf",

	render: function render() {
		var itemRows = [];
		this.props.items.forEach(function (item) {
			itemRows.push(React.createElement(Item, {
				item: item,
				recommender: this.props.user,
				key: item.title }));
		}, this);

		var userItem = "";
		if (this.props.showUser == true) {
			userItem = React.createElement(UserItem, { user: this.props.user });
		}

		var shelfUrl = "#shelf/" + this.props.id;

		return React.createElement(
			"div",
			{ className: "shelf" },
			React.createElement(
				"h2",
				{ className: "shelf-info" },
				React.createElement(
					"div",
					{ className: "shelf-title" },
					React.createElement(
						"a",
						{ href: shelfUrl },
						this.props.title
					)
				)
			),
			React.createElement(
				"div",
				{ className: "shelf-scroll-pane" },
				React.createElement(
					"div",
					{ className: "shelf-items" },
					userItem,
					itemRows
				)
			)
		);
	}
});

window.Shelves = React.createClass({
	displayName: "Shelves",

	render: function render() {
		var showTheUser = false;
		if (this.props.showUser) {
			showTheUser = this.props.showUser;
		}

		var shelves = [];
		if (this.props.shelves) {
			this.props.shelves.forEach(function (shelf) {
				shelves.push(React.createElement(Shelf, {
					id: shelf.id,
					title: shelf.title,
					items: shelf.items,
					user: shelf.creator,
					showUser: showTheUser,
					key: shelf.title }));
			}, this);
		}

		return React.createElement(
			"div",
			{ className: "board-canvas" },
			React.createElement(
				"div",
				{ className: "board" },
				shelves
			)
		);
	}
});

window.UserBanner = React.createClass({
	displayName: "UserBanner",

	render: function render() {
		var bgStyle = { backgroundImage: "url(" + this.props.user.avatar + ")" };

		return React.createElement(
			"div",
			{ className: "banner user-banner" },
			React.createElement("div", { className: "user-image-frame", style: bgStyle }),
			React.createElement(
				"div",
				{ className: "vitals" },
				React.createElement(
					"h3",
					{ className: "user-name" },
					this.props.user.name
				),
				React.createElement(
					"h4",
					{ className: "user-tagline" },
					this.props.user.tagline
				),
				React.createElement(
					"p",
					{ className: "desc" },
					this.props.user.description
				)
			)
		);
	}
});

window.ShelfBanner = React.createClass({
	displayName: "ShelfBanner",

	render: function render() {
		var bgStyle = { backgroundImage: "url(" + this.props.user.avatar + ")" };

		return React.createElement(
			"div",
			{ className: "banner shelf-banner" },
			React.createElement("div", { className: "user-image-frame", style: bgStyle }),
			React.createElement(
				"div",
				{ className: "vitals" },
				React.createElement(
					"h2",
					{ className: "shelf-title" },
					this.props.title
				),
				React.createElement(
					"h3",
					{ className: "user-name" },
					"recommended by ",
					this.props.user.displayName
				),
				React.createElement(
					"h4",
					{ className: "user-tagline" },
					this.props.user.tagline
				),
				React.createElement(
					"p",
					{ className: "desc" },
					this.props.description
				)
			)
		);
	}
});

/*
	A user's "bookcase" aka a board
*/
window.Board = React.createClass({
	displayName: "Board",

	saveBoard: function saveBoard() {
		var bodyJson = JSON.stringify(this.props.board);

		nanoajax.ajax({
			url: 'http://api.liberator.me/boards/1/',
			method: 'PUT',
			body: "user=http://api.liberator.me/users/1/&jsonCache=" + bodyJson
		}, function (code, responseText, response) {
			console.log(response);
		});
	},

	render: function render() {

		if (!_.isNull(this.props.board)) {
			return React.createElement(
				"div",
				{ className: "board-main-content" },
				React.createElement(UserBanner, {
					user: this.props.board.user,
					saveBoard: this.saveBoard }),
				React.createElement(Shelves, {
					shelves: this.props.board.shelves })
			);
		} else {
			return React.createElement(
				"div",
				null,
				"no active board"
			);
		}
	}
});

/*
	shows multiple user shelves
*/
window.Listing = React.createClass({
	displayName: "Listing",

	render: function render() {
		return React.createElement(
			"div",
			{ className: "listing" },
			React.createElement(
				"div",
				{ className: "landing-promo" },
				React.createElement(
					"h1",
					null,
					"Book Recommendations from Inspiring People"
				),
				React.createElement(
					"p",
					null,
					"The most inspiring people all have one thing in common: they read."
				),
				React.createElement(
					"p",
					null,
					"Do you want to make an impact?  Learn from the best.  Liberator has recommendations from artists, experts and leaders.  Don’t let an algorithm decide what you’ll read next - browse the shelves below to find your next inspiration."
				)
			),
			React.createElement(Shelves, {
				shelves: this.props.shelves,
				showUser: true })
		);
	}
});

window.MasonryShelf = React.createClass({
	displayName: "MasonryShelf",

	render: function render() {
		var creator = this.props.creator;
		var itemEls = [];
		_.each(this.props.items, function (item) {
			itemEls.push(React.createElement(Item, {
				item: item,
				recommender: creator,
				key: item.title }));
		});

		return React.createElement(
			"div",
			{ className: "masonry-container" },
			React.createElement(ShelfBanner, {
				user: this.props.creator,
				title: this.props.title,
				description: this.props.description }),
			React.createElement(
				"ul",
				{ className: "masonry" },
				itemEls
			)
		);
	}
});