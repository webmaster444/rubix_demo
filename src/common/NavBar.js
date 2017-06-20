import React from 'react';
import { browserHistory } from 'react-router';
import { 
	Navbar, Nav, NavItem, NavDropdown, MenuItem,
	Button
} from '@sketchpixy/rubix'

import Auth from '../Auth.js';

export default class NavBar extends React.Component{
	constructor(props) {
		super(props);
		
	}
	logout(){
		Auth.deauthenticateUser();
		browserHistory.push('/login');
	}
	render(){
		return(
			<Navbar fluid inverse={this.props.inverse}>
				{/*<Navbar.Header>
					<Navbar.Brand>
						<a href="#">Brand</a>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav>
					<NavItem active eventKey={1} href="#">Link 1</NavItem>
					<NavItem eventKey={2} href="#">Link 2</NavItem>
					<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
						<MenuItem eventKey={3.1} active>Action</MenuItem>
						<MenuItem eventKey={3.2}>Another action</MenuItem>
						<MenuItem eventKey={3.3}>Something else here</MenuItem>
						<MenuItem divider />
						<MenuItem eventKey={3.4}>Separated link</MenuItem>
					</NavDropdown>
				</Nav>*/}
				<Nav pullRight>
					<NavItem eventKey={4} ><Button onClick={this.logout} >Log out</Button></NavItem>
				</Nav>
			</Navbar>
		)
	}
}