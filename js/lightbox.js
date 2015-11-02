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

/*
	created once per book
*/
window.BookLightbox = React.createClass({
   
   	/* 'private', immutable properties for external ebook lib */
   	Book: null,
	epubOptions: {
		restore: true
	},

	getInitialState: function(){
		return { 
			totalPages: '...',
			currentPage: '...',
		};
	},

	prevPage: function() {
		this.Book.prevPage();
		this.setPageNum(this.calculatePageNum());
	},

	nextPage: function() {
		this.Book.nextPage();
		this.setPageNum(this.calculatePageNum());
	},

	initializePages: function(totPages) {
		var curPage = 1;

		if( !_.isEmpty(this.props.startingCfi) ) {
			this.Book.goto(this.props.startingCfi);
			curPage = this.calculatePageNum();
		}

		this.setState({
			totalPages: totPages,
			currentPage: curPage,
		});	
		
	},

	calculatePageNum: function() {
        var curLoc = this.Book.getCurrentLocationCfi();
    	return this.Book.pagination.pageFromCfi(curLoc);
	},

	setPageNum: function(pageNum) {
		this.setState({
			currentPage: pageNum 
		});
	},

	closeLightbox: function() {
		this.props.setCfi(this.Book.getCurrentLocationCfi());
		this.props.setActiveItem(null);
	},

	componentDidMount: function() {
		var opts = _.clone(this.epubOptions);
		var book = ePub( this.props.item.epub, opts );
		this.Book = book;
		book.renderTo("epubReader"); 

		book.ready.all.then(function(){
			book.generatePagination();
		});

		var setPages = this.initializePages;
		book.pageListReady.then(function(pageList){
			setPages(pageList.length);
		});	
	},

	render: function() {
		return (
			<Lightbox closeLightbox={this.closeLightbox}>
				<div className="book">
					<h4 className="book-title">
						{this.props.item.title} 
						<span className="book-author"> - {this.props.item.author}</span>
					</h4>
					<div className="reader">
						<div className="btn-page prev" onClick={this.prevPage}>&lt;</div>
						<div id="epubReader"></div>
						<div className="btn-page next" onClick={this.nextPage}>&gt;</div>
						<div className="reader-nav">
							page <div className="pageNum curPage">{this.state.currentPage}</div>
							&nbsp;of <div className="pageNum totPage">{this.state.totalPages}</div> 
						</div>
					</div>
				</div>
			</Lightbox>
		);
	}

});