import React from 'react';

import {
  Sidebar, SidebarNav, SidebarNavItem,
  SidebarControls, SidebarControlBtn,
  LoremIpsum, Grid, Row, Col, FormControl,
  Label, Progress, Icon,
  SidebarDivider,DropdownButton
} from '@sketchpixy/rubix';

import { Link, withRouter } from 'react-router';

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
}
];

@withRouter
class ApplicationSidebar extends React.Component {
  componentDidMount() {
    $('#sidebar a').on('click', function(){
        $("#sub_mbl_nav_btn").click(); //bootstrap 3.x by Richard
        $('#sidebar_btn a').click();
    });
  }

  handleChange(e) {
    this._nav.search(e.target.value);
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

  handleLogout(e){
    this.props.router.push('/');
  }
  render() {
    var dir = this.props.location.pathname;
    var index_str = dir.lastIndexOf('/');
    var id_str = dir.substr(index_str + 1);

    var links_data = ::this.findElement(applications_data,'name',id_str).views[0].menus;

    let submenu_items=[];
    if(links_data !=undefined){
      links_data.map(function(application, i){
        submenu_items.push(<SidebarNavItem glyph='icon-fontello-gauge' eventKey={i} name={application} />);
      })
    }else{
      submenu_items = <span> </span>;
    }

    let applications_list = [];
    applications_data.map(function(application,i){
      applications_list.push(<SidebarNavItem name={application.title} href={application.name}/>);
    })

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
                  <SidebarNavItem glyph='icon-ikons-logout' href='#' onClick={::this.handleLogout} name='Logout' />
                </SidebarNav>
                <br />
                <br />
                <br />
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
