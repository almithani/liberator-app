window.EmailSignupForm = React.createClass({
getInitialState: function() {
		return {
			emailValue: "",
			error: null,
			success: null,
		};
	},

	handleChange: function(event) {
		this.setState({
			emailValue: event.target.value
		});
	},

	setError: function(errorMsg) {
		this.setState({
			error: errorMsg
		});		
	},

	setSuccess: function() {
		this.setState({
			success: true
		});
	},

	submitEmail: function() {

		var setError = this.setError;
		var setSuccess = this.setSuccess;

		nanoajax.ajax({
			url: 'http://api.liberator.me/emails/', 
			method: 'POST', 
			body: 'email='+this.state.emailValue+'&username='+this.state.emailValue
		}, function (code, responseText, response) {
			if( code==400 ) {
				var responseJson = JSON.parse(responseText);
				var msg = '';
				_.each(responseJson, function(value) {
					msg += value;
				});
				setError(msg);
			} else if( code==201 ) {
				setSuccess();
			}
		});
	},

	formSubmit: function(event) {
		event.preventDefault();
		this.submitEmail();
	},

	render: function() {

		var error = '';
		var formClass = 'form-submit-email ';
		if( !_.isNull(this.state.error) ){
			formClass += ' error';
			error = <div className="error">
						{this.state.error}
					</div>;
		}

		var success = '';
		if( !_.isNull(this.state.success) ){
			formClass += ' success';
			success = <div className="success">
						Thanks for signing up!
					</div>;
		}	

		return (
			<div>
				{success}
				<form className={formClass} onSubmit={this.formSubmit}>
					{error}
					<input type="text" name="email" value={this.state.emailValue} onChange={this.handleChange} placeholder="enter your email" />
					<a onClick={this.submitEmail} className="btn-read">submit</a>
				</form>
			</div>
		);
	}	
});