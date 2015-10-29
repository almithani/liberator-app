window.Lightbox = React.createClass({
	/*
		This is a barebones lightbox.  Uses props.children (aka DOM children) as content.
		Use property closeLightbox to bind to the close event.
	*/

	contentStyles: {
		position: 'fixed',
		top: '10%',
		bottom: '10%',
		left: '20%',
		right: '20%',
		backgroundColor: '#fff',
		borderRadius: '3px',
		zIndex:'101',
		padding: '10px'
	},

	overlayStyles: {
		background: 'black',
		opacity: '.5',
		position: 'fixed',
		top: '0px',
		bottom: '0px',
		left: '0px',
		right: '0px',
		zIndex: '100'
	},

	closeTagStyles: {
		float: 'right',
		marginTop: '-15px',
		marginRight: '-20px',
		cursor: 'pointer',
		color: '#fff',
		border: '1px solid #000',
		borderRadius: '6px',
		background: '#FF4751',
		fontSize: '1.5em',
		lineHeight: '0.5em',
		fontWeight: 'bold',
		display: 'inline-block',
		padding: '3px 5px 5px 5px',
		textDecoration: 'none'
	},

	render: function(){
		return (
			<div>
				<div style={this.overlayStyles} onClick={this.props.closeLightbox} />
				<div style={this.contentStyles}>
					<a style={this.closeTagStyles} onClick={this.props.closeLightbox}>x</a>
					{this.props.children}
				</div>
			</div>
		);
	}  
});


window.BookLightbox = React.createClass({

	Book: {},
   
	epubOptions: {
		restore: true
	},	//private var	

	prevPage: function() {
		this.Book.prevPage();
	},

	nextPage: function() {
		this.Book.nextPage();
	},

	closeLightbox: function() {
		this.props.setActiveItem(null);
	},	

	componentDidUpdate: function() {
		//this.Book = ePub("data/melville_moby-dick.epub");
		if( this.props.activeItem != null ) {
			var opts = _.clone(this.epubOptions);
			this.Book = ePub( this.props.activeItem.epub, opts );
			this.Book.renderTo("epubReader");  
		}
	},

	render: function() {
		if ( this.props.activeItem != null ){
			return (
				<Lightbox closeLightbox={this.closeLightbox}>
					<div className="book">
						<h4 className="book-title">
							{this.props.activeItem.title} 
							<span className="book-author"> - {this.props.activeItem.author}</span>
						</h4>
						<div className="reader">
							<div className="btn-page prev" onClick={this.prevPage}>&lt;</div>
							<div id="epubReader"></div>
							<div className="btn-page next" onClick={this.nextPage}>&gt;</div>
						</div>
					</div>
				</Lightbox>
			);
		} else {
			return (<div></div>);
		}
	}

});