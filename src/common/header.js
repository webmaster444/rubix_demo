import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { Link, withRouter } from 'react-router';

import l20n, { Entity } from '@sketchpixy/rubix/lib/L20n';

import {
  Label,
  SidebarBtn,
  Dispatcher,
  NavDropdown,
  NavDropdownHover,
  Navbar,
  Nav,
  NavItem,
  MenuItem,
  Badge,
  Button,
  Icon,
  Grid,
  Row,
  Radio,
  Col,
  PanelContainer,
  Panel,
  PanelHeader,
  PanelBody,
  DropdownButton,
  SidebarNavItem
} from '@sketchpixy/rubix';

var applications_data = [ 
  { 
    name:"Application1",id:"application1",links:[{"label":"Link1","href":"/link1"},{"label":"Link2","href":"/link2"}]
  },{
    name:"Application2",id:"application2",links:[{"label":"Link21","href":"/link21"},{"label":"Link22","href":"/link22"}]
  }
];

@withRouter
class DropdownsAndDropups extends React.Component {
  getPath(path) {
    var dir = this.props.location.pathname.search('rtl') !== -1 ? 'rtl' : 'ltr';
    path = `/${dir}/${path}`;
    return path;
  }

  findElement(arr,propName,propValue){
    for(var i=0;i<arr.length;i++){
      if(arr[i][propName] == propValue)
        return arr[i];
    }
    return false;
  }

  render() {
    var dir = this.props.location.pathname;
    var index_str = dir.lastIndexOf('/');
    var id_str = dir.substr(index_str + 1);

    var links_data = ::this.findElement(applications_data,'id',id_str).links;

    return (
      <Col xs={12}>
        <div>
        <Navbar fluid bsStyle="inverse" id="sub_nav">
          <Navbar.Header>
          <DropdownButton bsStyle='darkgreen45' title='Applications' class='apps_dropdown'>
            <SidebarNavItem name='Application1' href={::this.getPath('application1')} />
            <SidebarNavItem name='Application2' href={::this.getPath('application2')} />
          </DropdownButton>
          </Navbar.Header>
          <Nav>
          {links_data!=undefined && links_data.map(function(application, i){
            return (<NavItem eventKey={i} >{application.label}</NavItem>)
          })}
          </Nav>
        </Navbar>
        </div>
      </Col>
    );
  }
}

class Application_Selector extends React.Component {
  render() {
    return (
      <DropdownsAndDropups />
    );
  }
}

class NotificationsMenu extends React.Component {
  render() {
    const bullhornIcon = (
      <span>
        <Icon bundle='fontello' glyph='bullhorn' />
        <Badge className='fg-darkbrown bg-orange notification-badge'>3</Badge>
      </span>
    );

    return (
      <NavDropdownHover noCaret eventKey={6} title={bullhornIcon} id='notifications-menu' className='header-menu collapse-left'>
        <MenuItem header>
          <Entity entity='notificationsMenuHeading' />
        </MenuItem>
        <MenuItem href='#'>
          <Grid>
            <Row>
              <Col xs={2} className='avatar-container' collapseRight>
                <div><img src='/imgs/app/avatars/avatar22.png' width='40' height='40' alt='sarah_patchett' /></div>
                <div className='text-center'>
                  <Label bsStyle='info'>NEW</Label>
                </div>
              </Col>
              <Col xs={10} className='notification-container' collapseLeft collapseRight>
                <div className='time'>
                  <strong className='fg-darkgray50'><Icon bundle='fontello' glyph='chat-5'/><em><Entity entity='notificationsTimeFirst' /></em></strong>
                </div>
                <div className='message-header'>
                  <strong className='fg-darkgreen45'>Sarah Patchett sent you a private message</strong>
                </div>
                <div className='message-details fg-text'>
                  <span>{"Hey Anna! Sorry for delayed response. I've just finished reading the mail you sent couple of days ago..."}</span>
                </div>
              </Col>
            </Row>
          </Grid>
        </MenuItem>
        <MenuItem href='#'>
          <Grid>
            <Row>
              <Col xs={2} className='avatar-container' collapseRight>
                <img src='/imgs/app/avatars/avatar21.png' width='40' height='40' alt='john_young' />
              </Col>
              <Col xs={10} className='notification-container' collapseLeft collapseRight>
                <div className='time'>
                  <strong className='fg-darkgray50'><Icon bundle='fontello' glyph='user-add'/><em>2 hours ago</em></strong>
                </div>
                <div className='message-header'>
                  <strong className='fg-darkgreen45'>John Young added you as a collaborator</strong>
                </div>
                <div className='message-details fg-text'>
                  <span>to the repository </span><em className='fg-darkblue'>sketchpixy/rubix</em>
                </div>
              </Col>
            </Row>
          </Grid>
        </MenuItem>
        <MenuItem href='#'>
          <Grid>
            <Row>
              <Col xs={2} className='avatar-container' collapseRight>
                <div><img src='/imgs/app/github.png' width='40' height='40' alt='github' /></div>
                <div className='text-center'>
                  <Label bsStyle='danger'>ALERT</Label>
                </div>
              </Col>
              <Col xs={10} className='notification-container' collapseLeft collapseRight>
                <div className='time'>
                  <strong className='fg-darkgray50'><Icon bundle='fontello' glyph='attention-alt-1'/><em>5 days ago</em></strong>
                </div>
                <div className='message-header'>
                  <strong className='fg-darkgreen45'>Github sent you a notification</strong>
                </div>
                <div className='message-details fg-text'>
                  <span>Your </span><span className='fg-darkblue'>Large Plan</span><span> will expire in one week. Please update your billing details at our Billing center. Thank you!</span>
                </div>
              </Col>
            </Row>
          </Grid>
        </MenuItem>
        <MenuItem noHover>
          <Grid style={{marginBottom: -10}}>
            <Row>
              <Col xs={6} collapseLeft collapseRight>
                <Button block className='notification-footer-btn left-btn'>MARK ALL READ</Button>
              </Col>
              <Col xs={6} collapseLeft collapseRight>
                <Button block className='notification-footer-btn right-btn'>VIEW ALL</Button>
              </Col>
            </Row>
          </Grid>
        </MenuItem>
      </NavDropdownHover>
    );
  }
}

@withRouter
class DirectNavItem extends React.Component {
  render() {
    var active = false;
    var currentLocation = this.props.location.pathname;

    if(!active && this.props.path) {
      active = this.props.router.isActive(this.props.path) && (currentLocation == this.props.path);
    }

    var classes = classNames({
      'pressed': active
    }, this.props.className);

    return (
      <NavItem className={classes} style={this.props.style} href={this.props.path} to={this.props.path} componentClass={Link}>
        <Icon bundle={this.props.bundle || 'fontello'} glyph={this.props.glyph} />
      </NavItem>
    );
  }
}

class CommitChart extends React.Component {
  componentDidMount() {
    var chart = new Rubix('#commit-column-chart', {
        width: '100%',
        height: 100,
        hideAxisAndGrid: true,
        hideLegend: true,
        tooltip: {
          color: '#2EB398'
        },
        margin: {
          top: 25,
          bottom: 25
        }
    });

    var alerts = chart.column_series({
        name: 'Commits',
        color: '#2EB398'
    });

    alerts.addData([
        {x: 10, y: 20},
        {x: 11, y: 50},
        {x: 12, y: 35},
        {x: 13, y: 30},
        {x: 14, y: 20},
        {x: 15, y: 25},
        {x: 16, y: 30},
        {x: 17, y: 50},
        {x: 18, y: 20},
        {x: 19, y: 30},
        {x: 20, y: 50},
        {x: 21, y: 20},
        {x: 22, y: 50},
        {x: 23, y: 35},
        {x: 24, y: 30},
        {x: 25, y: 20},
        {x: 26, y: 30}
    ]);

    $(window).trigger('resize');
  }
  render() {
    return (
      <Grid style={{marginBottom: -10}}>
        <Row>
          <Col xs={12}>
            <div id='commit-column-chart'></div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

class LtrRtlLayout extends React.Component {
  state = {
    ltr: true
  };

  handleLayoutRadioChange(e) {
    var dir = e.target.value;
    var location = window.location.href;
    if (dir === 'ltr') {
      location = location.replace('rtl', dir);
    } else {
      location = location.replace('ltr', dir);
    }

    window.location.href = location;
  }
  componentDidMount() {
    if($('html').attr('dir') === 'ltr') {
      this.setState({ ltr: true });
    } else {
      this.setState({ ltr: false });
    }
  }
  render() {
    let { ltr } = this.state;
    return (
      <Grid>
        <Row>
          <Col xs={6}>
            <Radio ref='ltr' value='ltr' name='switch-layout' checked={ltr} onChange={::this.handleLayoutRadioChange}>
              LTR
            </Radio>
          </Col>
          <Col xs={6} className='text-right'>
            <Radio ref='rtl' value='rtl' name='switch-layout' checked={!ltr} onChange={::this.handleLayoutRadioChange}>
              RTL
            </Radio>
          </Col>
        </Row>
      </Grid>
    );
  }
}


class BodyLayout extends React.Component {
  state = {
    fixedLayout: true
  };

  bodyLayoutRadioChange(value) {
    if(!value) return;
    if(value === 'fixed-body') {
      $('html').removeClass('static');
      localStorage.setItem('bodyLayout', 'fixed-body');
      Dispatcher.publish('sidebar:reinitialize');
      this.setState({ fixedLayout: true });
    } else if(value === 'static-body') {
      $('html').addClass('static');
      localStorage.setItem('bodyLayout', 'static-body');
      Dispatcher.publish('sidebar:destroy');
      this.setState({ fixedLayout: false });
    }
  }
  handleBodyLayoutRadioChange(e) {
    this.bodyLayoutRadioChange(e.target.value);
  }
  componentDidMount() {
    this.bodyLayoutRadioChange(localStorage.getItem('bodyLayout'));
  }
  render() {
    let { fixedLayout } = this.state;

    return (
      <Grid>
        <Row>
          <Col xs={8}>
            <Radio ref='fixed-body' value='fixed-body' name='switch-body-layout' checked={fixedLayout} onChange={::this.handleBodyLayoutRadioChange}>
              Fixed (Header + Sidebar)
            </Radio>
          </Col>
          <Col xs={4} className='text-right'>
            <Radio ref='static-body' value='static-body' name='switch-body-layout' checked={!fixedLayout} onChange={::this.handleBodyLayoutRadioChange}>
              Static
            </Radio>
          </Col>
        </Row>
      </Grid>
    );
  }
}

class SettingsMenu extends React.Component {
  state = {
    fluidLayout: true
  };

  handleViewportChange(eventKey) {
    if (eventKey === 'fluid') {
      localStorage.setItem('settingsMenu', 'fluid');
      $('html').removeClass('boxed');
      this.setState({ fluidLayout: true })
    } else {
      localStorage.setItem('settingsMenu', 'boxed');
      $('html').addClass('boxed');
      this.setState({ fluidLayout: false })
    }
    setTimeout(() => {
      $(window).trigger('resize');
    }, 300);
  }

  componentDidMount() {
    let item = localStorage.getItem('settingsMenu') || 'fluid';
    localStorage.setItem('settingsMenu', item);

    this.handleViewportChange(item);
  }

  render() {
    const cogIcon = (
      <Icon bundle='fontello' glyph='cog-7' style={{position: 'relative', top: 2}} />
    );

    let { fluidLayout } = this.state;

    return (
      <NavDropdownHover noCaret eventKey={4} title={cogIcon} id='settings-menu' className='header-menu small-font' onSelect={::this.handleViewportChange}>
        <MenuItem eventKey='dimension' header>
          <Entity entity='settingsMenuHeading' defaultValue='dimension' />
        </MenuItem>
        <MenuItem eventKey='fluid' active={fluidLayout}>
          <Entity entity='settingsMenuFluid' defaultValue='Fluid' />
        </MenuItem>
        <MenuItem eventKey='boxed' active={!fluidLayout}>
          <Entity entity='settingsMenuBoxed' defaultValue='Boxed (990px)' />
        </MenuItem>
        <MenuItem eventKey='layout' header>
          Layout
        </MenuItem>
        <MenuItem eventKey='ltrRtlLayout' noHover>
          <LtrRtlLayout />
        </MenuItem>
        <MenuItem eventKey='bodyLayoutHeading' header>
          Body Layout
        </MenuItem>
        <MenuItem eventKey='bodyLayout' noHover>
          <BodyLayout />
        </MenuItem>
      </NavDropdownHover>
    );
  }
}

@withRouter
class HeaderNavigation extends React.Component {
  handleLogout(e) {
    this.props.router.push('/');
  }

  render() {
    return (
      <Nav pullRight>
        <Nav className='hidden-xs'>
          <NavItem divider />
          <SettingsMenu />
        </Nav>
        <Nav>
          <NavItem className='logout' href='#' onClick={::this.handleLogout}>
            <Icon bundle='fontello' glyph='menu-1' />
          </NavItem>
        </Nav>
      </Nav>
    );
  }
}

export default class Header extends React.Component {
  render() {
    return (
      <Grid id='navbar' {...this.props}>
        <Row>
          <Col xs={12}>
            <Navbar fixedTop fluid id='rubix-nav-header'>
              <Row>
                <Col xs={3} visible='xs'>
                  <SidebarBtn />
                </Col>
                <Col xs={6} sm={8}>
                  <Application_Selector/>
                </Col>
                <Col xs={3} sm={4} collapseRight className='text-right'>
                  <HeaderNavigation />
                </Col>
              </Row>
            </Navbar>
          </Col>
        </Row>
      </Grid>
    );
  }
}
