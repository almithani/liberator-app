
var Item = React.createClass({
	render: function() {
		return (
			<li className="item">
				<h4 className="item-title">{this.props.title}</h4>
				<h5 className="item-author">{this.props.author}</h5>
				<img className="item-cover" src={this.props.img} alt="" />
				<button type="button" className="btn btn-success">READ</button>
			</li>
		);
	}
});

var Shelf = React.createClass({
	render: function() {
		var itemRows = [];
		this.props.items.forEach(function(item) {
            itemRows.push(<Item title={item.title} author={item.author} img={item.img} key={item.title} />);
        });
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
			shelves.push(<Shelf title={shelf.title} items={shelf.items} key={shelf.title} />);
		});
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
	render: function() {
		return (
			<div className="board-main-content">
				<div className="board-header">
					<h2 className="board-name">{this.props.name}</h2>
				</div>

				<Shelves shelves={this.props.shelves} />
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