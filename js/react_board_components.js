
window.Item = React.createClass({

	getInitialState: function(){
		return { 
			currentCfi: null,	//cfi is ebook internal index/url/page
		};
	},

	setCfi: function(newCfi) {
		this.setState({
			currentCfi: newCfi 
		});		
	},

	setAsActiveItem: function() {
		this.props.setActiveItem(this.props.item);
	},

	render: function() {
		var lightbox = '';
		if( this.props.activeItem==this.props.item ) {
			lightbox = <BookSummaryLightbox
							item={this.props.item} 
							setActiveItem={this.props.setActiveItem} />;
		}

		return (
				<table className="item">
					<tbody>
						<tr>
							<td className="item-cover"><img src={this.props.item.cover} alt="" onClick={this.setAsActiveItem} /></td>
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
				by <h3 className="user-name">{this.props.user.displayName}</h3>
				<h4 className="user-tagline">{this.props.user.tagline}</h4>
			</div>
		)
	}
});

window.Shelf = React.createClass({
	render: function() {
		var itemRows = [];
		this.props.items.forEach(function(item) {
            itemRows.push(<Item 
            				item={item} 
            				activeItem={this.props.activeItem} 
            				setActiveItem={this.props.setActiveItem} 
            				key={item.title} />
            			);
        }, this);

        var bgStyle = { backgroundImage: "url("+this.props.user.avatar+")" }

        var userItem = "";
        if( this.props.showUser==true ) {
        	userItem = <UserItem user={this.props.user} />;
        }

		return (
			<div className="shelf">
				<h2 className="shelf-info">
					<div className="shelf-title">{this.props.title}</div>
					<div className="user-image-frame" style={bgStyle}></div>
					<span className="shelf-username">by {this.props.user.name}</span>
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
								title={shelf.title} 
								items={shelf.items} 
								user={shelf.creator}
								showUser={showTheUser}
								activeItem={this.props.activeItem} 
								setActiveItem={this.props.setActiveItem} 
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
			<div className="user-banner">
				<div className="user-image-frame" style={bgStyle}></div>
				<div className="user-vitals">
					<h3 className="user-name">{this.props.user.name}</h3>
					<h4 className="user-tagline">{this.props.user.tagline}</h4>
					<p className="user-desc">
						{this.props.user.description}   
					</p>
				</div>
			</div>
		);
	}
});


/*
	A user's "bookcase" aka a board
*/
window.Board = React.createClass({

	saveBoard: function() {
		var bodyJson = JSON.stringify(this.props.board);

		nanoajax.ajax({
			url: 'http://api.recoroll.com/boards/1/', 
			method: 'PUT',
			body: "user=http://api.recoroll.com/users/1/&jsonCache="+bodyJson,
		}, function (code, responseText, response) {
			console.log(response);
		});		
	},

	render: function() {

		if( !_.isNull(this.props.board) ){
			return (
				<div className="board-main-content">
					<UserBanner 
						user={this.props.board.user} 
						saveBoard={this.saveBoard} />
					<Shelves 
						shelves={this.props.board.shelves} 
						activeItem={this.props.activeItem} 
						setActiveItem={this.props.setActiveItem} />
				</div>
			);			
		} else {
			return(<div>no active board</div>);
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
				<h2>Read authors not genres</h2>
				<p>
				Just because a book is popular, doesn&#8217;t mean that you&#8217;ll like it.  
				Books are way to personal to let your friends or an algorithm decide what you&#8217;ll read next.  
				Instead, why not get recommendations from people reading the same things as you?  
				Even better - get recommendations from people you trust.
				</p>

				<h2>Check out these shelves from our users:</h2>
				<Shelves 
					shelves={this.props.shelves} 
					showUser={true}
					activeItem={this.props.activeItem} 
					setActiveItem={this.props.setActiveItem} />				
			</div>
		);
	}

});


