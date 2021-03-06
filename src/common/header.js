import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { Link, withRouter, browserHistory } from 'react-router';

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
  SidebarNavItem,
  PanelContainer,
  Panel,
  PanelHeader,
  PanelBody,
  Image,
  Modal,
  DropdownButton,
  OverlayTrigger,
  TimelineView,
  TimelineItem,
  TimelineBody,
  TimelineHeader,
  TimelineAvatar,
  TimelineTitle
} from '@sketchpixy/rubix';

import Auth from '../Auth.js';
import SearchForm from './SearchForm.js';
var applications_data = [
{
  "description": "Search and Retrieve Stored Files",
  "name": "storage",
  "title": "storage",
  "version": 1,
  "views": [
    {
      "component": "viewDownloadFiles",
      "menus": [
        "mnuSearchFiles"
      ],
      "name": "viewDownload"
    }
  ]
}];
var startX = 0

@withRouter
class Application_Selector extends React.Component {
  componentDidMount() {
    $('#sub_nav a').on('click', function(){
        $("#sub_nav_btn").click(); //bootstrap 3.x by Richard
    });
  }
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

    var links_data = [],submenu_items=[],applications_list=[];
    var tmp_str = ::this.findElement(applications_data,'name',id_str);

    if(tmp_str){
      links_data = ::this.findElement(applications_data,'name',id_str).views[0].menus;

      submenu_items=[];
      if(links_data !=undefined){
        links_data.map(function(application, i){
          var ts = {application};
          if(ts.application=='mnuSearchFiles'){
            submenu_items.push(<Nav> <SearchNav /> </Nav>);
          }else{
            submenu_items.push(<SidebarNavItem eventKey={i} name={application} />);  
          }
          
        })
      }else{
        submenu_items = <span> </span>;
      }

      applications_list = [];
      applications_data.map(function(application,i){
        applications_list.push(<NavItem eventKey={i} href={application.name}> {application.title}</NavItem>);
      })
    }

    return (
      <Col xs={12}>
        <div>
        <Navbar fluid bsStyle="inverse" id="sub_nav">
          <Navbar.Header>
          <DropdownButton bsStyle='darkgreen45' title={id_str} className='apps_dropdown' id="sub_nav_btn">
            {applications_list}
          </DropdownButton>
          
          </Navbar.Header>
          <Nav>
            {submenu_items}
          </Nav>
        </Navbar>
        </div>
      </Col>
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

class MainMenu extends React.Component {
  logout(){
    Auth.deauthenticateUser();
    browserHistory.push('/login');
  }
  render() {
    const cogIcon = (
      <Image src={`/imgs/app/main_menu.svg`} width='50' height='40'/>
    );

    return (
      <NavDropdownHover noCaret eventKey={4} title={cogIcon} id='main-menu' className='header-menu small-font'>
        <MenuItem href="/settings">
          <Icon bundle='stroke-gap-icons' glyph='Settings' /><span> Settings </span>
        </MenuItem>
        <MenuItem href="/account">
          <Icon bundle='simple-line-icons' glyph='user-follow' /><span> Account </span>
        </MenuItem>
        <MenuItem eventKey='help'  href="/home">
          <Icon bundle='fontello' glyph='help-circle' /><span> Help</span>
        </MenuItem>
        <MenuItem onClick={this.logout}>
          <Icon bundle='ikons' glyph='logout' /> <span> Logout </span>
        </MenuItem>
      </NavDropdownHover>
    );
  }
}

class SidebarButton extends React.Component{
  componentDidMount(){
    $(document).on('click',function(e) {
      if((e.target.className!="icon-fontello-menu-1 rubix-icon")&&(e.target.id!="sub_mbl_nav_btn")){
        if($('#container').hasClass('container-open')){
          $('#container').removeClass('container-open');
          $('#notification_btn').show();
        }
      }else{
        return;
      }
    });

    $('#mbl_nav_btn').on('click',function(){
      $('#container').toggleClass('container-open');
      if($('#container').hasClass('container-open')){
        $('#notification_btn').hide();
      }else{
        $('#notification_btn').show();
      }
    })

    $('#sidebar a').on('click', function(){
        $('#mbl_nav_btn').click();
    });

    window.addEventListener( 'touchstart', function(e) {
      startX = e.targetTouches[0].pageX;
    }, false );

    window.addEventListener( 'touchmove', function(e) {
        var diffX = e.changedTouches[0].pageX - startX;
        if ( diffX <= -30 && $('#container').hasClass('container-open') == true) {
            $('#container').removeClass('container-open');
            $('#notification_btn').show();
        }

    }, false );
  }

  state = {
    id:'mbl_nav_btn'
  }
  render(){
    return (<Link id={this.props.id}> <Icon bundle='fontello' glyph='menu-1' /> </Link>);
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
        <Nav>
          <MainMenu />
        </Nav>
      </Nav>
    );
  }
}

class SpecialModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {

    return (
      <Modal id="notification_modal" show={this.state.showModal} onHide={::this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <TimelineView className='border-black50 tl-blue'>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineAvatar src='/imgs/app/avatars/avatar5.png' className='border-blue' />
                    <TimelineTitle>
                      Jordyn Ouellet
                    </TimelineTitle>
                  </TimelineHeader>
                  <TimelineBody>
                    <ul>
                      <li>
                        <div>
                          <div className='fg-lightgray'><small><strong>Aug 10, 2014</strong></small></div>
                          <div><small>Sent you a friend request!</small></div>
                        </div>
                        <br/>
                        <div className='text-center'>
                          <Button xs outlined bsStyle='darkgreen45'>
                            Accept
                          </Button>{' '}
                          <Button xs outlined bsStyle='red'>
                            Reject
                          </Button>
                        </div>
                      </li>
                    </ul>
                  </TimelineBody>
                </TimelineItem>
              </TimelineView>
              <TimelineView className='border-black50 tl-green'>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineAvatar src='/imgs/app/avatars/avatar7.png' className='border-green' />
                    <TimelineTitle>
                      Toby King
                    </TimelineTitle>
                  </TimelineHeader>
                  <TimelineBody>
                    <ul>
                      <li>
                        <div className='fg-lightgray'><small><strong>Aug 9, 2014</strong></small></div>
                        <div>
                          <small>Visiting <strong className='fg-darkgreen45'>The Museum of Modern Art</strong> at <strong><em>11 W 53rd St, New York, NY 10019</em></strong></small>
                        </div>
                        <br/>
                        <img src='/imgs/app/staticmap.png' alt='Points of Interest in Lower Manhattan' />
                      </li>
                      <li>
                        <div className='fg-lightgray'><small><strong>Aug 8, 2014</strong></small></div>
                        <div>
                          <small>Driving through! :)</small>
                        </div>
                        <br/>
                        <img width='155' src='/imgs/app/gallery/tumblr_n7yhe1sTa41st5lhmo1_1280-thumb.jpg' alt='the taxi' />
                      </li>
                    </ul>
                  </TimelineBody>
                </TimelineItem>
              </TimelineView>
              <TimelineView className='border-black50 tl-yellow'>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineAvatar src='/imgs/app/avatars/avatar10.png' className='border-yellow' />
                    <TimelineTitle>
                      Angelina Mills
                    </TimelineTitle>
                  </TimelineHeader>
                  <TimelineBody>
                    <ul>
                      <li>
                        <div className='fg-lightgray'><small><strong>Aug 8, 2014</strong></small></div>
                        <div>
                          <small>Hey you free tomorrow? Lets go shopping!</small>
                        </div>
                      </li>
                    </ul>
                  </TimelineBody>
                </TimelineItem>
              </TimelineView>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={::this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class SearchModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {

    return (
      <Modal id="search_modal" show={this.state.showModal} onHide={::this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Enter date range to search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SearchForm />
        </Modal.Body>
      </Modal>
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

class SearchNav extends React.Component {
  componentDidMount(){
    if($(window).width()>990)
      this.specialModal.open();
  }
  launchSpecialModal() {
    this.specialModal.open();
  }
  render() {
    const rssfeedIcon = (
      <span>
        <Icon bundle='fontello' glyph='search' />
      </span>
    );

    return (
    <Nav id="search_nav">
      <NavItem eventKey={3} onClick={::this.launchSpecialModal}> <Icon bundle='fontello' glyph='search' /> Search </NavItem>
      <SearchModal ref={(c) => this.specialModal = c} />
    </Nav>

    );
  }
}
export default class Header extends React.Component {
  launchSpecialModal() {
    this.specialModal.open();
  }

  render() {
    return (
      <Grid id='navbar' {...this.props}>
        <Row>
          <Col xs={12}>
            <Navbar fixedTop fluid id='rubix-nav-header'>
              <Row>
                <Col xs={1} visible='xs'>
                  <SidebarButton id="mbl_nav_btn"/>
                </Col>
                <Col xs={9} sm={8} visible='sm,md,lg'>
                  <Application_Selector/>
                </Col>
                <Col className='text-right' visible="sm,md,lg">
                  <HeaderNavigation />
                </Col>

                <Col visible="sm,md,lg">
                <Button id="notification_btn1" className="notification_btn" bsStyle='primary' onClick={::this.launchSpecialModal}>
                  Notifications
                </Button>
                </Col>
                <Col visible="xs">
                <Button id="notification_btn" className="notification_btn" bsStyle='primary' onClick={::this.launchSpecialModal} rounded>
                  <Icon glyph="icon-fontello-plus-1" />
                </Button>
                </Col>
                <SpecialModal ref={(c) => this.specialModal = c} />
              </Row>
            </Navbar>
          </Col>
        </Row>
      </Grid>

    );
  }
}
