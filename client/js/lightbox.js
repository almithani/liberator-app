window.Lightbox = React.createClass({

    getInitialState: function(){
        return { display: true };
    },

    openLightbox: function(){
        //this.setState({display: true});
    },

    closeLightbox: function(){
        //this.setState({display: false});
        this.props.setActiveItem(null);
    },

    contentStyles: {
        position: 'fixed',
        top: '25%',
        left: '30%',
        right: '30%',
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

        if ( this.props.activeItem != null ){
            return (
                <div>
                    <div style={this.overlayStyles} onClick={this.closeLightbox} />
                    <div style={this.contentStyles}>
                        <a style={this.closeTagStyles} onClick={this.closeLightbox}>x</a>
                        {this.props.activeItem.title}
                    </div>
            	</div>
            );
        } else {
            return (<div></div>);
        }
    }  
});