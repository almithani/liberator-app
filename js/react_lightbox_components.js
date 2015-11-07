window.Lightbox = React.createClass({
	/*
		This is a barebones lightbox.  Uses props.children (aka DOM children) as content.
		Use property closeLightbox to bind to the close event.
	*/

	render: function(){
		return (
			<div>
				<div className='lightbox-overlay' onClick={this.props.closeLightbox} />
				<div className='lightbox-content'>
					<a className='lightbox-btn-close' onClick={this.props.closeLightbox}>x</a>
					{this.props.children}
				</div>
			</div>
		);
	}  
});

window.BookSummaryLightbox = React.createClass({

	closeLightbox: function() {
		this.props.setActiveItem(null);
	},	

	render: function() {
		var bgStyle = { backgroundImage: "url(/img/avatar.jpg)" }
		var quote = '';
		if( this.props.item.quote ) {
			quote = <div className="quote">
						<div className="user-image-frame" style={bgStyle}></div>
						"{this.props.item.quote}"
					</div>;
		}

		return (
			<div className="lightbox-summary">
				<Lightbox closeLightbox={this.closeLightbox}>
					<div className="book" onScroll={this.scrollHandler} onWheel={this.scrollHandler}>
						<h4 className="book-title">
							{this.props.item.title} 
							<span className="book-author"> - {this.props.item.author}</span>
						</h4>

						<div className="book-more-info">
							<div className='book-cover'>
								<img src={this.props.item.img} alt={this.props.item.title} />
							</div>

							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla libero eros, eget malesuada erat feugiat vitae. Fusce id lacus rhoncus, aliquet quam ut, faucibus tortor. Fusce maximus sodales ultrices. 
							</p>
							<p>
								Donec rutrum, libero vel maximus vehicula, dui nulla auctor magna, id ullamcorper diam nisl non tellus. Sed ut dapibus risus. Nulla faucibus tristique leo, vitae faucibus lectus molestie id. Suspendisse convallis dui eget nibh congue, et auctor magna fringilla. Suspendisse potenti. Mauris vitae faucibus nunc.
							</p>


							<div className="book-quotes">
								{quote}
							</div>
						</div>

						<div class="book-ctas">
							<a className="btn-read" href={this.props.item.readLink} target="_blank">read online now</a>
							<a className="btn-download" href={this.props.item.downloadLink} target="_blank">download from project gutenberg</a>
						</div>
					</div>
				</Lightbox>
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
			loaded: false,
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

	scrollHandler: function(event) {
		event.preventDefault();
	},

	initializePages: function(totPages) {
		var curPage = 1;

		if( !_.isEmpty(this.props.startingCfi) ) {
			this.Book.goto(this.props.startingCfi);
			curPage = this.Book.pagination.pageFromCfi(this.props.startingCfi);
		}

		this.setState({
			totalPages: totPages,
			currentPage: curPage,
		});	
	},

	setLoaded: function() {
		if( !this.state.loaded ) {
			this.setState({
				loaded: true
			});				
		}
	},

	calculatePageNum: function() {
        var curLoc = this.Book.getCurrentLocationCfi();
        var page = this.Book.pagination.pageFromCfi(curLoc);

    	return page;
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

		var setLoadedFn = this.setLoaded;
		book.ready.all.then(function(){
			setLoadedFn();
			book.generatePagination();			
		});

		var setPages = this.initializePages;
		book.pageListReady.then(function(pageList){
			setPages(pageList.length);
		});	
	},

	render: function() {

		var loadingGif = <img className='loading' src='/img/loading.gif' alt='loading...' />;

		if( this.state.loaded ) {
			loadingGif = '';
		}

		return (
			<Lightbox closeLightbox={this.closeLightbox}>
				<div className="book" onScroll={this.scrollHandler} onWheel={this.scrollHandler}>
					<h4 className="book-title">
						{this.props.item.title} 
						<span className="book-author"> - {this.props.item.author}</span>
					</h4>
					<div className="reader">
						<div className="btn-page prev" onClick={this.prevPage}>&lt;</div>
						{loadingGif}
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