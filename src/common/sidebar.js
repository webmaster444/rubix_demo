import React from 'react';

import {
  Sidebar, SidebarNav, SidebarNavItem,
  SidebarControls, SidebarControlBtn,
  LoremIpsum, Grid, Row, Col, FormControl,
  Label, Progress, Icon,
  SidebarDivider,DropdownButton,Modal
} from '@sketchpixy/rubix';

import { Link, withRouter, browserHistory } from 'react-router';
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
        "mnuSearchFiles",'Test'
      ],
      "name": "viewDownload"
    }
  ]
}
];

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
        <Modal.Body>
          <SearchForm />
        </Modal.Body>
      </Modal>
    );
  }
}

@withRouter
class ApplicationSidebar extends React.Component {
  constructor () {
    super();
    this.launchSearchModal = this.launchSearchModal.bind(this);
  }
  componentDidMount() {
    $('#sidebar a').on('click', function(){
        $("#sub_mbl_nav_btn").click(); //bootstrap 3.x by Richard
        $('#sidebar_btn a').click();
    });
  }

  handleChange(e) {
    this._nav.search(e.target.value);
  }

  logout(){
    Auth.deauthenticateUser();
    browserHistory.push('/login');
  }
  
  launchSearchModal() {
    this.specialModal.open();
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
    var _this = this;
            console.log(_this);

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
            submenu_items.push(<SidebarNavItem glyph='icon-fontello-search' eventKey={i} name='Search Files' onClick={_this.launchSearchModal} />);
          }else{
            submenu_items.push(<SidebarNavItem glyph='icon-fontello-gauge' eventKey={i} name={application} />);
          }
        })
      }else{
        submenu_items = <span> </span>;
      }

      applications_list = [];
      applications_data.map(function(application,i){
        applications_list.push(<SidebarNavItem name={application.title} href={application.name}/>);
      })
    }
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <div className='sidebar-nav-container'>
                <SidebarNav style={{marginBottom: 0}} ref={(c) => this._nav = c}>

                  <DropdownButton bsStyle='darkgreen45' title={id_str} id="sub_mbl_nav_btn">
                    {applications_list}
                  </DropdownButton>

                  <SidebarDivider />
                  { /** Pages Section */ }
                  <div className='sidebar-header'>MENU</div>
                  {submenu_items}
                  <SidebarDivider />
                  { /** Components Section */ }
                  <div className='sidebar-header'>MAIM MENU</div>

                  <SidebarNavItem glyph='icon-stroke-gap-icons-Settings' name='Settings' href={::this.getPath('settings')} />
                  <SidebarNavItem glyph='icon-simple-line-icons-user-follow' href={::this.getPath('account')} name='Account'/>
                  <SidebarNavItem glyph='icon-fontello-help' href={::this.getPath('help')} name='Help' />
                  <SidebarNavItem glyph='icon-ikons-logout' href='#' onClick={::this.logout} name='Logout' />
                </SidebarNav>
                <br />
                <br />
                <br />
                <SearchModal ref={(c) => this.specialModal = c} />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

@withRouter
export default class SidebarContainer extends React.Component {
  getPath(path) {
    var dir = this.props.location.pathname.search('rtl') !== -1 ? 'rtl' : 'ltr';
    path = `/${dir}/${path}`;
    return path;
  }

  render() {
    return (
      <div id='sidebar'>
        <div id='sidebar-container'>
          <Sidebar sidebar={0}>
            <ApplicationSidebar />
          </Sidebar>
        </div>
      </div>
    );
  }
}
