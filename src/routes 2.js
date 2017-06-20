import React from 'react';
import classNames from 'classnames';
import { IndexRedirect, Route, browserHistory } from 'react-router';

import { Grid, Row, Col } from '@sketchpixy/rubix';
import Auth from './Auth.js';
import Home from './routes/Home';
import Login from './routes/Login';

class App extends React.Component {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

class EnsureLoggedInContainer extends React.Component {
	componentDidMount() {
		if (!Auth.isUserAuthenticated()) {
			browserHistory.replace("/login");
		}
	}

	render() {
		if (Auth.isUserAuthenticated()) {
			console.log('authenticated');
			return this.props.children
		} else {
			console.log('not - authenticated');
			return null
		}
	}
}

export default (
	<Route path='/' component={App}>
		<IndexRedirect to="home" />
		<Route path='login' component={Login} />
		<Route component={EnsureLoggedInContainer}>
			<Route path='home' component={Home} />
		</Route>
	</Route>
);
