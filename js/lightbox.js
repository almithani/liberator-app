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

	Book: null,
   
	epubOptions: {
		restore: true
	},	//private var	

	getInitialState: function(){
		return { 
			totalPages: 0,
			currentPage: 0
		};
	},

	prevPage: function() {
		this.Book.prevPage();
		//this.setPageNum(this.calculatePageNum());
	},

	nextPage: function() {
		this.Book.nextPage();
		//this.setPageNum(this.calculatePageNum());
	},

	setTotalPages: function(totPages) {
		console.log('hi')
		this.setState({
			totalPages: totPages 
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
		this.props.setActiveItem(null);
	},	

	componentDidUpdate: function() {

		var book = this.Book;
		if( this.props.activeItem != null ) {// && _.isEmpty(book) ) {
			var opts = _.clone(this.epubOptions);
			book = ePub( this.props.activeItem.epub, opts );
			
			this.Book = book;
			book.renderTo("epubReader"); 
		} else if(this.props.activeItem == null) {
			book = null;
			//this.state.totalPages = 0; //don't want to trigger a render
			//this.state.currentPage = 0; //don't want to trigger a render
		}

		//page numbers if we have a book
		/*if( !_.isEmpty(book) && this.props.activeItem != null ) {

			book.ready.all.then(function(){
                book.generatePagination();
            });

			var curNumPages = this.state.totalPages;
			var setPages = this.setTotalPages;
			this.state.currentPage = 1; //don't want to trigger a render

            book.pageListReady.then(function(pageList){
            	if(curNumPages != pageList.length) {
            		setPages(pageList.length);
            	}
            });			
		}*/
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
							<div className="reader-nav">
								<div className="pageNum curPage">{this.state.currentPage}</div> /
								<div className="pageNum totPage">{this.state.totalPages}</div> 
							</div>
						</div>
					</div>
				</Lightbox>
			);
		} else {
			return (<div></div>);
		}
	}

});