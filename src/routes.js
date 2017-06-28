import React from 'react';
import classNames from 'classnames';
import {Router,Route,browserHistory, IndexRedirect} from 'react-router';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

/* Common Components */

import Header from './common/header';
import Sidebar from './common/sidebar';
/* Pages */

import Login from './routes/Login';
import Signup from './routes/Signup';
import Storage from './routes/Storage';
import Auth from './Auth.js';
import Status from './routes/Status';
class App extends React.Component {
  render() {
    return (
      <MainContainer {...this.props}>
        <Sidebar />
        <Header />
        <div id='body'>
          <Grid>
            <Row>
              <Col xs={12}>
                {this.props.children}
              </Col>
            </Row>
          </Grid>
        </div>
      </MainContainer>
    );
  }
}

class EnsureLoggedInContainer extends React.Component {
  componentDidMount() {
    console.log('didmount');
    if (!Auth.isUserAuthenticated()) {
      browserHistory.replace("/ltr/login");
    }
  }

  render() {
    console.log('HHHHHHHHHHH');
    if (Auth.isUserAuthenticated()) {
      return this.props.children
    } else {
      console.log('not - authenticated');
      return null
    }
  }
}

const isLoggedIn = (nextState, replace) => {
  if (Auth.isUserAuthenticated()) {
    console.log('111111111');
    replace({ pathname: '/ltr/storage' })
  }
}

/**
 * Includes Sidebar, Header and Footer.
 */
const routes = (

    <Route component={App}>
      <IndexRedirect to="/ltr/storage" />
      <Route component={EnsureLoggedInContainer}>
      <Route path="storage" component={Storage} />
      </Route>
    </Route>
);

/**
 * No Sidebar, Header or Footer. Only the Body is rendered.
 */
const basicRoutes = (
  <Route>
    <Route path='login' onEnter={isLoggedIn} component={Login} />
    <Route path='signup' component={Signup} />
    <Route path='status' component={Status} />
  </Route>
);

const combinedRoutes = (
  <Route>
    <Route>
      {routes}
    </Route>
    <Route>
      {basicRoutes}
    </Route>
  </Route>
);



export default (
  <Router>
    <Route path='/'>
      {combinedRoutes}
    </Route>
    <Route path='/ltr'>
      {combinedRoutes}
    </Route>
    <Route path='/rtl'>
      {combinedRoutes}
    </Route>
  </Router>
);
