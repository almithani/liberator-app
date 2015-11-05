
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
			lightbox = 	<BookLightbox 
							item={this.props.item}
							startingCfi={this.state.currentCfi}
							setCfi={this.setCfi}
							setActiveItem={this.props.setActiveItem} />;
		}

		var bgStyle = { backgroundImage: "url(/img/avatar.jpg)" }

		return (
			<li className="item">
				<h4 className="item-title">{this.props.item.title}</h4>
				<h5 className="item-author">{this.props.item.author}</h5>
				<img className="item-cover" src={this.props.item.img} alt="" onClick={this.setAsActiveItem} />
				<div className="item-user-quote">
					<div className="user-quote">"{this.props.item.quote}"</div>
					<div className="user-image-frame" style={bgStyle}></div>
				</div>
				<a className="item-btn-read" onClick={this.setAsActiveItem}>read</a>
				{lightbox}
			</li>
		);
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
		return (
			<div className="shelf">
				<h3 className="shelf-title">{this.props.title}</h3>
				<ul className="shelf-items">
					{itemRows}
				</ul>
			</div>
		);
	}
});

window.Shelves = React.createClass({
	render: function() {
		var shelves = [];
		this.props.shelves.forEach(function(shelf) {
			shelves.push(<Shelf 
							title={shelf.title} 
							items={shelf.items} 
							activeItem={this.props.activeItem} 
							setActiveItem={this.props.setActiveItem} 
							key={shelf.title} />
						);
		}, this);
		return (
			<div className="board-canvas">
				<div className="board">
					{shelves}
				</div>
			</div>
		);
	}
});

window.Board = React.createClass({

	render: function() {

		var bgStyle = { backgroundImage: "url(/img/avatar.jpg)" }

		return (
			<div className="board-main-content">
				<div className="board-header">
					<div className="user-image-frame" style={bgStyle}></div>
					<h2 className="board-name">{this.props.name}</h2>
				</div>

				<Shelves 
					shelves={this.props.shelves} 
					activeItem={this.props.activeItem} 
					setActiveItem={this.props.setActiveItem} />
			</div>
		);
	}
});
