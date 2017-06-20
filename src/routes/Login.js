import React from 'react';
import classNames from 'classnames';
import { browserHistory } from 'react-router';

import { Grid, Row, Col, Form, FormGroup, Button, ControlLabel, FormControl, Checkbox, Modal} from '@sketchpixy/rubix';
import Panelunit from '../common/PanelUnit';
import Auth from '../Auth.js';
import settings from '../settings.js';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.openResetModal = this.openResetModal.bind(this);
		this.closeResetModal = this.closeResetModal.bind(this);
		this.changeEmail = this.changeEmail.bind(this);
		this.sendPwResetLink = this.sendPwResetLink.bind(this);
		this.state = {
			pwResetModal: false,
			email: ''
		}
	}
	componentDidMount() {
		Messenger.options = { theme: 'flat' };
	}
	changeEmail(e){
		this.setState({email: e.target.value});
		// const isValidEmail = e.target.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		// if(isValidEmail){
		// 	$('#sendBtn').removeAttr('disabled');
		// }
	}
	openResetModal(){
		this.setState({ pwResetModal: true });
	}
	closeResetModal(){
		this.setState({ pwResetModal: false });
	}
	sendPwResetLink(){
		this.closeResetModal();
		Messenger({
			extraClasses: 'messenger-fixed messenger-on-top'
		}).post({
			id: 'resetpassword',
			overlayClosesOnClick: false,
			singleton: false,
			showCloseButton: true,
			message: `Password reset link has been sent!`
		});
	}
	submitForm(e){
		e.preventDefault();

		var user = $('input[name=user]').val();
		var password = $('input[name=password]').val();
		if (user == "" || password == "") {
			Messenger({
				extraClasses: 'messenger-fixed messenger-on-top'
			}).post({
				id: 'nothingInputCredential',
				type: 'error',
				singleton: false,
				showCloseButton: true,
				message: 'Please input user name and password!'
			});
			return false;
		}
		var form = new FormData();
		form.append("user", user);
		form.append("password", password);
		form.append("auth_token", "uTDfRK4WPtpchbr3mHsIsftXmBlw6VWVakHvPiIGWoc=");

		$.ajax({
			"method": "POST",
			"crossDomain": true,
			"dataType": 'json',
			"processData": false,
			"contentType": false,
			"mimeType": "multipart/form-data",
			"url": settings.apiBase+"/api/v1/login",
			"data": form
		})
		.done(function (response) {
			Auth.authenticateUser(response.sessionId);
			browserHistory.push('/storage');
		})
		.fail(function( jqXHR, textStatus ) {
			Messenger({
				extraClasses: 'messenger-fixed messenger-on-top'
			}).post({
				type: 'error',
				singleton: false,
				showCloseButton: true,
				message: 'You have entered an incorrect user name, email combination, please retry!'
			});
		});
	}
	render() {
		return (
			<div className="loginPage">
				<Row>
					<Col sm={4}>
					</Col>
					<Col sm={4}>
						<div style={{marginTop: '50px'}}>
							<Panelunit title="Login">
								<div className="login_body">
									<h1>Storage Search System</h1>
									<Form horizontal>
										<FormGroup controlId="formHorizontalEmail">
											<Col componentClass={ControlLabel} sm={3}>
												User name
											</Col>
											<Col sm={9}>
												<FormControl type="text" placeholder="User name" name="user"/>
											</Col>
										</FormGroup>

										<FormGroup controlId="formHorizontalPassword">
											<Col componentClass={ControlLabel} sm={3}>
												Password
											</Col>
											<Col sm={9}>
												<FormControl type="password" placeholder="Password" name="password"/>
											</Col>
										</FormGroup>

										<FormGroup >
											<Col sm={12}>
												<a onClick={this.openResetModal} style={{float: 'right', cursor: 'pointer'}} > Forgot password? </a>
											</Col>
										</FormGroup>

										<FormGroup>
											<Col smOffset={3} sm={9}>
												<Button type="submit" onClick={this.submitForm} style={{float: 'right'}}>
													Login
												</Button>
											</Col>
										</FormGroup>
									</Form>
								</div>
							</Panelunit>
						</div>
					</Col>
					<Col sm={4}>
					</Col>
				</Row>
				<Modal show={this.state.pwResetModal} onHide={this.closeResetModal} id='passwordResetModal'>
					<Modal.Header closeButton>
						<Modal.Title>Password Reset</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<FormGroup>
							<ControlLabel>Please enter your email for reset instructions!</ControlLabel>
							<FormControl id='resetEmail' type='email' autoFocus placeholder='Email' onChange={this.changeEmail}/>
						</FormGroup>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.closeResetModal} >Close</Button>
						<Button onClick={this.sendPwResetLink} id='sendBtn' bsStyle='primary' disabled={!this.state.email}>Send</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

