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
    name:"Application1",id:"application1",links:[{"label":"Link1","href":"/link1"},{"label":"Link2","href":"/link2"}]
  },{
    name:"Application2",id:"application2",links:[{"label":"Link21","href":"/link21"},{"label":"Link22","href":"/link22"}]
  }
];

@withRouter
class ApplicationSidebar extends React.Component {
  componentDidMount() {
    $('#sidebar a').on('click', function(){
        $("#sub_mbl_nav_btn").click(); //bootstrap 3.x by Richard
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

    var links_data = ::this.findElement(applications_data,'id',id_str).links;
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <div className='sidebar-nav-container'>
                <SidebarNav style={{marginBottom: 0}} ref={(c) => this._nav = c}>

                  <DropdownButton bsStyle='darkgreen45' title={id_str} id="sub_mbl_nav_btn">
                    <SidebarNavItem href={::this.getPath('application1')} name="Application1" />
                    <SidebarNavItem href={::this.getPath('application2')} name="Application2" />
                  </DropdownButton>

                  <SidebarDivider />
                  { /** Pages Section */ }
                  <div className='sidebar-header'>PAGES</div>

                  {links_data!=undefined && links_data.map(function(application, i){
                    return (<SidebarNavItem glyph='icon-fontello-gauge' eventKey={i} name={application.label} />)
                  })}
                  <SidebarDivider />

                  { /** Components Section */ }
                  <div className='sidebar-header'>MAIM MENU</div>

                  <SidebarNavItem glyph='icon-stroke-gap-icons-Settings' name='Settings' href={::this.getPath('settings')} />
                  <SidebarNavItem glyph='icon-simple-line-icons-user-follow' href={::this.getPath('account')} name='Account'/>
                  <SidebarNavItem glyph='icon-fontello-help' href={::this.getPath('panels')} name='Help' />
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
