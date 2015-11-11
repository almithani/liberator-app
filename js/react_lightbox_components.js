window.Lightbox = React.createClass({
	/*
		This is a barebones lightbox.  Uses props.children (aka DOM children) as content.
		Use property closeLightbox to bind to the close event.
	*/
	scrollHandler: function(event) {
		event.preventDefault();
	},

	contentClick: function(event) {
		//this is to prevent lightbox closing on click
		event.stopPropagation();
	},

	render: function(){
		return (
			<div>
				<div className='lightbox-overlay' onClick={this.props.closeLightbox} />
				<div className='lightbox-container' onClick={this.props.closeLightbox} onScroll={this.scrollHandler} onWheel={this.scrollHandler}>
					<div className='lightbox-content' onClick={this.contentClick}>
						<a className='lightbox-btn-close' onClick={this.props.closeLightbox}>x</a>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}  
});


window.AboutLightbox = React.createClass({
	getInitialState: function() {
		return {
			emailValue: ""
		};
	},

	handleChange: function(event) {
		this.setState({
			emailValue: event.target.value
		});
	},

	closeLightbox: function(event) {
		this.props.closeWindow();
	},

	submitEmail: function() {
		console.log(this.state.emailValue);
		nanoajax.ajax({
			url: 'http://api.recoroll.com/users/', 
			method: 'POST', 
			body: 'email='+this.state.emailValue+'&username='+this.state.emailValue
		}, function (code, responseText, request) {
			console.log(code);
			console.log(responseText);
			console.log(request);
		});
	},

	render: function() {
		return (
			<div className="lightbox-about">
				<Lightbox closeLightbox={this.closeLightbox}>
					<h4>Why Liberator?</h4>

					<div className="quote-noimage">
						<div className="quote-text">
							“A man is known by the books he reads.” 
						</div>
						<div className="quote-author">
							- Ralph Waldo Emerson
						</div>
					</div>

					<p>
						Books are the best way to learn and improve.  
						The right book at the right time can inspire you to change your life.
						Today, it&#8217;s never been easier to acquire and read books - but many still find it
						difficult to find the time to read. 
					</p>

					<p>
						I created Liberator to help people read more; to make the process of finding and sharing books 
						fun and easy.  I&#8217;ve used sites like Amazon and GoodReads extensively - for me, they never 
						captured the excitement of that conversation when you find someone who has read an appreciated
						a book as much as you do.
					</p>

					<p>
						This site is a work in progress.  If you&#8217;d like to keep informed of progress, please sign up below:
					</p>

					<form className="form-submit-email">
						<input type="text" name="email" value={this.state.emailValue} onChange={this.handleChange} placeholder="enter your email" />
						<a onClick={this.submitEmail} className="btn-read">submit</a>
					</form>

				</Lightbox>
			</div>
		);
	}
});

window.BookSummaryLightbox = React.createClass({

	closeLightbox: function(event) {
		this.props.setActiveItem(null);
	},	

	render: function() {
		var description = '';
		if( this.props.item.desc ) {
			var paragraphs = this.props.item.desc.split("\n");
			_.each(paragraphs, function(para) {
				description = <div>{description}<p>{para}</p></div>;
			});
		}

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
					<div className="book">
						<h4 className="book-title">
							{this.props.item.title} 
							<span className="book-author"> - {this.props.item.author}</span>
						</h4>

						<div className="book-more-info">
							<div className='book-cover'>
								<img src={this.props.item.img} alt={this.props.item.title} />
							</div>

							{description}

							<div className="book-quotes">
								{quote}
							</div>
						</div>

						<div className="book-ctas">
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
		return false;
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