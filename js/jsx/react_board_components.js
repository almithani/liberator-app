
window.ItemQuote = React.createClass({

	getInitialState: function() {
		return {
			isActive: false
		}
	},

	setActive: function() {
		this.setState({
			isActive: true
		})
	},

	setInactive: function() {
		this.setState({
			isActive: false
		})
	},

	render: function() {
		var visibleQuote = "";
		var buttonClass = "author-quote action-icon ";
		if( this.state.isActive ) {
			visibleQuote = 	<div className="item-quote-content">
								<div className="item-quote-quote">"{this.props.quote}"</div>
								<div className="item-quote-quoted">-{this.props.quoted}</div>
							</div>;
			buttonClass = buttonClass+" active";
		}

		return(
			<div className="item-quote">
				{visibleQuote}
				<a className={buttonClass}
						onMouseEnter={this.setActive}
						onMouseLeave={this.setInactive} 
						onTouchStart={this.setActive} 
						onTouchCancel={this.setInactive}
						onTouchEnd={this.setInactive} >

					<img src="img/entypo/message.svg" className="svg-inject" alt="why?" />
				</a>
			</div>
		);
	}

});

window.Item = React.createClass({

	getInitialState: function(){
		return { 
			isActive: false,
			currentCfi: null,	//cfi is ebook internal index/url/page
		};
	},

	setCfi: function(newCfi) {
		this.setState({
			currentCfi: newCfi 
		});		
	},

	deactivateItem: function() {
		this.setState({
			isActive: false
		});
	},

	activateItem: function() {
		this.setState({
			isActive: true
		});
	},

	render: function() {
		var lightbox = '';
		if( this.state.isActive ) {
			lightbox = <BookSummaryLightbox
							item={this.props.item} 
							avatar={this.props.recommender.avatar}
							closeLightbox={this.deactivateItem} />;
		}

		var quoteButton = '';
		if( this.props.item.quote ) {
			quoteButton = <ItemQuote
								quote={this.props.item.quote}
								quoted={this.props.recommender.displayName} />;
		}

		return (
				<table className="item">
					<tbody>
						<tr>
							<td className="item-cover">
								<img className="item-cover-img" src={this.props.item.cover} alt="" onClick={this.activateItem} />
								{quoteButton}
								<a className="more-info action-icon" onClick={this.activateItem} onTouchStart={this.activateItem} >
									<img src="img/entypo/dots-three-horizontal.svg" className="svg-inject" alt="more info" />
								</a>
							</td>
						</tr>
						<tr>
							<td className="item-info">
								<div className="item-title">{this.props.item.title}</div>
								<div className="item-author">{this.props.item.author}</div>
								{lightbox}
							</td>
						</tr>
					</tbody>
				</table>
		);
	}
});

window.UserItem = React.createClass({
	render: function() {
		var bgStyle = { backgroundImage: "url("+this.props.user.avatar+")" }

		return (
			<div className="item user-item">
				<div className="user-image-frame" style={bgStyle}></div>
				recommended by <h3 className="user-name">{this.props.user.displayName}</h3>
				<h4 className="user-tagline">{this.props.user.tagline}</h4>
			</div>
		)
	}
});

window.AddItemButton = React.createClass({

	getInitialState: function(){
		return { 
			isActive: false,
		};
	},

	deactivateItem: function() {
		this.setState({
			isActive: false
		});
	},

	openAddItemLightbox: function() {
		this.setState({
			isActive: true
		});
	},

	render: function() {
		var lightbox = '';
		if( this.state.isActive ) {
			lightbox = <AddBookLightbox closeLightbox={this.deactivateItem} />;
		}

		return (
			<div className="item btn-add-item">
				<div className="btn-add-item-cta" onClick={this.openAddItemLightbox}>
					<div className="big-plus">+</div>
					<br />click here to add a new item
				</div>
				{lightbox}
			</div>
		);
	}
});

window.Shelf = React.createClass({

	render: function() {
		var itemRows = [];
		this.props.items.forEach(function(item) {
            itemRows.push(<Item 
            				item={item}
            				recommender={this.props.user}
            				key={item.title} />
            			);
        }, this);


        var userItem = "";
        if( this.props.showUser==true ) {
        	userItem = <UserItem user={this.props.user} />;
        }

        var shelfUrl = "#shelf/"+this.props.id;

		return (
			<div className="shelf">
				<h2 className="shelf-info">
					<div className="shelf-title"><a href={shelfUrl}>{this.props.title}</a></div>
				</h2>
				<div className="shelf-scroll-pane">
					<div className="shelf-items">
						{userItem}
						{itemRows}
					</div>
				</div>
			</div>
		);
	}
});

window.Shelves = React.createClass({

	render: function() {
		var showTheUser = false;
		if( this.props.showUser ) {
			showTheUser = this.props.showUser;
		}

		var shelves = [];
		if( this.props.shelves ){
			this.props.shelves.forEach(function(shelf) {
				shelves.push(<Shelf 
								id={shelf.id}
								title={shelf.title} 
								items={shelf.items} 
								user={shelf.creator}
								showUser={showTheUser}
								key={shelf.title} />
							);
			}, this);			
		}

		return (
			<div className="board-canvas">
				<div className="board">
					{shelves}
				</div>
			</div>
		);
	}
});

window.UserBanner = React.createClass({

	render: function() {
		var bgStyle = { backgroundImage: "url("+this.props.user.avatar+")" }

		return (
			<div className="banner user-banner">
				<div className="user-image-frame" style={bgStyle}></div>
				<div className="vitals">
					<h3 className="user-name">{this.props.user.name}</h3>
					<h4 className="user-tagline">{this.props.user.tagline}</h4>
					<p className="desc">
						{this.props.user.description}   
					</p>
				</div>
			</div>
		);
	}
});


window.ShelfBanner = React.createClass({

	render: function() {
		var bgStyle = { backgroundImage: "url("+this.props.user.avatar+")" }

		return (
			<div className="banner shelf-banner">
				<div className="user-image-frame" style={bgStyle}></div>
				<div className="vitals">
					<h2 className="shelf-title">{this.props.title}</h2>
					<h3 className="user-name">recommended by {this.props.user.displayName}</h3>
					<h4 className="user-tagline">{this.props.user.tagline}</h4>
					<p className="desc">
						{this.props.description}   
					</p>
				</div>
			</div>
		);
	}
});


/*
	A user's "bookcase" 
*/
window.UserListing = React.createClass({

	render: function() {

		if( !_.isNull(this.props.listing) ){
			return (
				<div className="board-main-content">
					<UserBanner 
						user={this.props.listing.user} />
					<Shelves 
						shelves={this.props.listing.shelves} />
				</div>
			);			
		} else {
			return(<div>no active listing</div>);
		}

	}
});

/*
	shows multiple user shelves
*/
window.Listing = React.createClass({

	render: function() {
		return (
			<div className="listing">
				<div className="landing-promo">
					<h1>Book Recommendations from Inspiring People</h1>
					<p>
					The most inspiring people all have one thing in common: they read.
					</p>

					<p>
					Do you want to make an impact?  Learn from the best.  Liberator has recommendations from artists, experts
					and leaders.  Don&#8217;t let an algorithm decide what you&#8217;ll 
					read next - browse the shelves below to find your next inspiration.
					</p>

				</div>

				<Shelves 
					shelves={this.props.shelves} 
					showUser={true} />				
			</div>
		);
	}
});


window.MasonryShelf = React.createClass({

	render: function() {
		var creator = this.props.creator;
		var itemEls = [];
		_.each( this.props.items, function(item){
			itemEls.push(<Item 
            				item={item} 
            				recommender={creator}
            				key={item.title} />
            			);
		});

		var addItemButton = "";
		if( this.props.loggedInUser && this.props.creator.id == this.props.loggedInUser.id ) {
			addItemButton = <AddItemButton />;
		}

		return (
			<div className="masonry-container">
				<ShelfBanner 
					user={this.props.creator}
					title={this.props.title}
					description={this.props.description} />

				<ul className="masonry">
					{itemEls}
					{addItemButton}
				</ul>
			</div>
		);
	}
});


