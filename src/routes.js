import React from 'react';
import classNames from 'classnames';
import { IndexRoute, Route, Redirect, IndexRedirect} from 'react-router';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

/* Common Components */

import Header from './common/header';
import Sidebar from './common/sidebar';
/* Pages */

import Application1 from './routes/Application1';
import Application2 from './routes/Application2';

import Signup from './routes/Signup';

import Auth from './Auth.js';
import Login from './routes/Login';
import Storage from './routes/Storage';

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

/**
 * Includes Sidebar, Header and Footer.
 */
const routes = (
  <Route component={App}>
    <Route path='storage' component={Storage} />
  </Route>
);

/**
 * No Sidebar, Header or Footer. Only the Body is rendered.
 */
const basicRoutes = (
  <Route>
    <Route path='login' component={Login} />
    <Route path='signup' component={Signup} />
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

class EnsureLoggedInContainer extends React.Component {
  componentDidMount() {
    console.log('heree');
    if (!Auth.isUserAuthenticated()) {
      browserHistory.replace("/login");
    }
  }

  render() {
    if (Auth.isUserAuthenticated()) {
      return this.props.children
    } else {
      return null
    }
  }
}

export default (
  <Route>
    <Route path='/' component={App}>
      <IndexRedirect to="ltr/login" />
      <Route path='login' component={Login} />
      <Route component={EnsureLoggedInContainer}>
        <Route path='storage' component={Storage} />
      </Route>
    </Route>

    <Route path='/ltr'>
      {combinedRoutes}
    </Route>
    <Route path='/rtl'>
      {combinedRoutes}
    </Route>
  </Route>
);
