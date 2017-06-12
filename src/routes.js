import React from 'react';
import classNames from 'classnames';
import { IndexRoute, Route, Redirect} from 'react-router';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

/* Common Components */

import Header from './common/header';
import Sidebar from './common/sidebar';
/* Pages */

import Homepage from './routes/Homepage';

import Application1 from './routes/Application1';
import Application2 from './routes/Application2';

import Fonts from './routes/Fonts';

import Login from './routes/Login';
import Signup from './routes/Signup';

import Lock from './routes/Lock';

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
    <Route path='application1' component={Application1} />
    <Route path='application2' component={Application2} />
    <Route path='fonts' component={Fonts} />
  </Route>
);

/**
 * No Sidebar, Header or Footer. Only the Body is rendered.
 */
const basicRoutes = (
  <Route>
    <Route path='lock' component={Lock} />
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

export default (
  <Route>
    <Route path='/' component={Homepage} />

    <Route path='/ltr'>
      {combinedRoutes}
    </Route>
    <Route path='/rtl'>
      {combinedRoutes}
    </Route>
  </Route>
);
