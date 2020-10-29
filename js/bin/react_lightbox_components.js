'use strict';

window.Lightbox = React.createClass({
	displayName: 'Lightbox',

	/*
 	This is a barebones lightbox.  Uses props.children (aka DOM children) as content.
 	Use property closeLightbox to bind to the close event.
 */

	scrollHandler: function scrollHandler(event) {
		event.preventDefault();
	},

	contentClick: function contentClick(event) {
		//this is to prevent lightbox closing on click
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
	},

	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement('div', { className: 'lightbox-overlay', onClick: this.props.closeLightbox }),
			React.createElement(
				'div',
				{ className: 'lightbox-container', onClick: this.props.closeLightbox, onScroll: this.scrollHandler, onWheel: this.scrollHandler },
				React.createElement(
					'div',
					{ className: 'lightbox-content', onClick: this.contentClick },
					React.createElement(
						'a',
						{ className: 'lightbox-btn-close', onClick: this.props.closeLightbox },
						'x'
					),
					this.props.children
				)
			)
		);
	}
});

window.AboutLightbox = React.createClass({
	displayName: 'AboutLightbox',

	getInitialState: function getInitialState() {
		return {
			emailValue: "",
			error: null,
			success: null
		};
	},

	handleChange: function handleChange(event) {
		this.setState({
			emailValue: event.target.value
		});
	},

	setError: function setError(errorMsg) {
		this.setState({
			error: errorMsg
		});
	},

	setSuccess: function setSuccess() {
		this.setState({
			success: true
		});
	},

	closeLightbox: function closeLightbox(event) {
		this.props.closeWindow();
	},

	submitEmail: function submitEmail() {

		var setError = this.setError;
		var setSuccess = this.setSuccess;

		nanoajax.ajax({
			url: 'https://api.liberator.me/emails/',
			method: 'POST',
			body: 'email=' + this.state.emailValue + '&username=' + this.state.emailValue
		}, function (code, responseText, response) {
			if (code == 400) {
				var responseJson = JSON.parse(responseText);
				var msg = '';
				_.each(responseJson, function (value) {
					msg += value;
				});
				setError(msg);
			} else if (code == 201) {
				setSuccess();
			}
		});
	},

	formSubmit: function formSubmit(event) {
		event.preventDefault();
		this.submitEmail();
	},

	render: function render() {

		var error = '';
		var formClass = 'form-submit-email ';
		if (!_.isNull(this.state.error)) {
			formClass += ' error';
			error = React.createElement(
				'div',
				{ className: 'error' },
				this.state.error
			);
		}

		var success = '';
		if (!_.isNull(this.state.success)) {
			formClass += ' success';
			success = React.createElement(
				'div',
				{ className: 'success' },
				'Thanks for signing up!'
			);
		}

		return React.createElement(
			'div',
			{ className: 'lightbox-about' },
			React.createElement(
				Lightbox,
				{ closeLightbox: this.closeLightbox },
				React.createElement(
					'h4',
					null,
					'Why Liberator?'
				),
				React.createElement(
					'div',
					{ className: 'quote-noimage' },
					React.createElement(
						'div',
						{ className: 'quote-text' },
						'\u201CA man is known by the books he reads.\u201D'
					),
					React.createElement(
						'div',
						{ className: 'quote-author' },
						'- Ralph Waldo Emerson'
					)
				),
				React.createElement(
					'p',
					null,
					'Books are the best way to learn and improve. The right book at the right time can inspire you to change your life.'
				),
				React.createElement(
					'p',
					null,
					React.createElement(
						'strong',
						null,
						'Liberator is meant to inspire people through books.'
					)
				),
				React.createElement(
					'p',
					null,
					'This site is a work in progress.  Sign up for updates:'
				),
				success,
				React.createElement(
					'form',
					{ className: formClass, onSubmit: this.formSubmit },
					error,
					React.createElement('input', { type: 'text', name: 'email', value: this.state.emailValue, onChange: this.handleChange, placeholder: 'enter your email' }),
					React.createElement(
						'a',
						{ onClick: this.submitEmail, className: 'btn-read' },
						'submit'
					)
				)
			)
		);
	}
});

window.BookSummaryLightbox = React.createClass({
	displayName: 'BookSummaryLightbox',


	closeLightbox: function closeLightbox(event) {
		this.props.closeLightbox();
	},

	render: function render() {
		var descriptions = [];
		if (this.props.item.description) {
			var paragraphs = this.props.item.description.split("\n");
			_.each(paragraphs, function (para, i) {
				descriptions.push(React.createElement(
					'p',
					{ key: i },
					para
				));
			});
		}

		var bgStyle = { backgroundImage: "url(" + this.props.avatar + ")" };
		var quote = '';
		if (this.props.item.quote) {
			quote = React.createElement(
				'div',
				{ className: 'quote' },
				React.createElement('div', { className: 'user-image-frame', style: bgStyle }),
				React.createElement(
					'div',
					{ className: 'quote-frame' },
					'"',
					this.props.item.quote,
					'"'
				)
			);
		}

		return React.createElement(
			'div',
			{ className: 'lightbox-summary' },
			React.createElement(
				Lightbox,
				{ closeLightbox: this.closeLightbox },
				React.createElement(
					'div',
					{ className: 'book' },
					React.createElement(
						'h4',
						{ className: 'book-title' },
						this.props.item.title,
						React.createElement(
							'span',
							{ className: 'book-author' },
							' - ',
							this.props.item.author
						)
					),
					React.createElement(
						'div',
						{ className: 'book-more-info' },
						React.createElement(
							'div',
							{ className: 'book-quotes' },
							quote
						),
						React.createElement(
							'div',
							{ className: 'book-cover' },
							React.createElement('img', { src: this.props.item.cover, alt: this.props.item.title })
						),
						React.createElement(
							'div',
							{ className: 'book-desc' },
							descriptions
						),
						React.createElement(
							'div',
							{ className: 'book-more-info-cta' },
							React.createElement(
								'a',
								{ href: this.props.item.amazon_link, target: '_blank' },
								'...more info'
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'book-ctas' },
						React.createElement(
							'a',
							{ className: 'btn-read', href: this.props.item.amazon_link, target: '_blank' },
							'read it now!'
						)
					)
				)
			)
		);
	}
});

/*
	created once per book
*/
window.BookLightbox = React.createClass({
	displayName: 'BookLightbox',


	/* 'private', immutable properties for external ebook lib */
	Book: null,
	epubOptions: {
		restore: true
	},

	getInitialState: function getInitialState() {
		return {
			totalPages: '...',
			currentPage: '...',
			loaded: false
		};
	},

	prevPage: function prevPage() {
		this.Book.prevPage();
		this.setPageNum(this.calculatePageNum());
	},

	nextPage: function nextPage() {
		this.Book.nextPage();
		this.setPageNum(this.calculatePageNum());
	},

	scrollHandler: function scrollHandler(event) {
		event.preventDefault();
	},

	initializePages: function initializePages(totPages) {
		var curPage = 1;

		if (!_.isEmpty(this.props.startingCfi)) {
			this.Book.goto(this.props.startingCfi);
			curPage = this.Book.pagination.pageFromCfi(this.props.startingCfi);
		}

		this.setState({
			totalPages: totPages,
			currentPage: curPage
		});
	},

	setLoaded: function setLoaded() {
		if (!this.state.loaded) {
			this.setState({
				loaded: true
			});
		}
	},

	calculatePageNum: function calculatePageNum() {
		var curLoc = this.Book.getCurrentLocationCfi();
		var page = this.Book.pagination.pageFromCfi(curLoc);

		return page;
	},

	setPageNum: function setPageNum(pageNum) {
		this.setState({
			currentPage: pageNum
		});
	},

	closeLightbox: function closeLightbox() {
		this.props.setCfi(this.Book.getCurrentLocationCfi());
		this.props.setActiveItem(null);
		return false;
	},

	componentDidMount: function componentDidMount() {
		var opts = _.clone(this.epubOptions);
		var book = ePub(this.props.item.epub, opts);
		this.Book = book;
		book.renderTo("epubReader");

		var setLoadedFn = this.setLoaded;
		book.ready.all.then(function () {
			setLoadedFn();
			book.generatePagination();
		});

		var setPages = this.initializePages;
		book.pageListReady.then(function (pageList) {
			setPages(pageList.length);
		});
	},

	render: function render() {

		var loadingGif = React.createElement('img', { className: 'loading', src: '/img/loading.gif', alt: 'loading...' });

		if (this.state.loaded) {
			loadingGif = '';
		}

		return React.createElement(
			Lightbox,
			{ closeLightbox: this.closeLightbox },
			React.createElement(
				'div',
				{ className: 'book', onScroll: this.scrollHandler, onWheel: this.scrollHandler },
				React.createElement(
					'h4',
					{ className: 'book-title' },
					this.props.item.title,
					React.createElement(
						'span',
						{ className: 'book-author' },
						' - ',
						this.props.item.author
					)
				),
				React.createElement(
					'div',
					{ className: 'reader' },
					React.createElement(
						'div',
						{ className: 'btn-page prev', onClick: this.prevPage },
						'<'
					),
					loadingGif,
					React.createElement('div', { id: 'epubReader' }),
					React.createElement(
						'div',
						{ className: 'btn-page next', onClick: this.nextPage },
						'>'
					),
					React.createElement(
						'div',
						{ className: 'reader-nav' },
						'page ',
						React.createElement(
							'div',
							{ className: 'pageNum curPage' },
							this.state.currentPage
						),
						'\xA0of ',
						React.createElement(
							'div',
							{ className: 'pageNum totPage' },
							this.state.totalPages
						)
					)
				)
			)
		);
	}

});