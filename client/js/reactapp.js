
var Item = React.createClass({
	setAsActiveItem: function() {
		this.props.setActiveItem(this.props.item);
	},

	render: function() {
		return (
			<li className="item">
				<h4 className="item-title">{this.props.item.title}</h4>
				<h5 className="item-author">{this.props.item.author}</h5>
				<img className="item-cover" src={this.props.item.img} alt="" onClick={this.setAsActiveItem} />
				<a className="item-btn-read" onClick={this.setAsActiveItem}>read</a>
			</li>
		);
	}
});

var Shelf = React.createClass({
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

var Shelves = React.createClass({
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

var Board = React.createClass({
	getInitialState: function(){
		return { 
			activeItem: null
		};
	},

	setActiveItem: function(item) {
		this.setState({
			activeItem: item 
		});
	},

	render: function() {
		return (
			<div className="board-main-content">
				<div className="board-header">
					<h2 className="board-name">{this.props.name}</h2>
				</div>

				<Shelves 
					shelves={this.props.shelves} 
					activeItem={this.state.activeItem} 
					setActiveItem={this.setActiveItem} />

				<BookLightbox 
					activeItem={this.state.activeItem} 
					setActiveItem={this.setActiveItem} />
			</div>
		);
	}
});



//expects "shelves" to be defined
var boardname = "Al's Books";

ReactDOM.render(
    <Board name={boardname} shelves={shelves} />,
    document.getElementById('content')
);