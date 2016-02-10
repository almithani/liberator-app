'use strict';

window.EmailSignupForm = React.createClass({
	displayName: 'EmailSignupForm',

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

	submitEmail: function submitEmail() {

		var setError = this.setError;
		var setSuccess = this.setSuccess;

		nanoajax.ajax({
			url: 'http://api.liberator.me/emails/',
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
			null,
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
		);
	}
});