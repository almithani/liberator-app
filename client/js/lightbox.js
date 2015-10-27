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
        color: '#7F7F7F',
        padding: '20px',
        border: '2px solid #ccc',
        borderRadius: '20px',
        boxShadow: '0 1px 5px #333',
        zIndex:'101'
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
        marginTop: '-30px',
        marginRight: '-30px',
        cursor: 'pointer',
        color: '#fff',
        border: '1px solid #AEAEAE',
        borderRadius: '30px',
        background: '#605F61',
        fontSize: '31px',
        fontWeight: 'bold',
        display: 'inline-block',
        lineHeight: '0px',
        padding: '11px 3px',
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

	Book: {},	//private var	

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
		this.Book = ePub("data/melville_moby-dick.epub");
		this.Book.renderTo("epubReader");  
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