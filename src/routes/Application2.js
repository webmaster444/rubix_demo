import React from 'react';

import {
  Row,
  Tab,
  Col,
  Nav,
  Icon,
  Grid,
  Form,
  Table,
  Label,
  Panel,
  Button,
  NavItem,
  Checkbox,
  Progress,
  PanelBody,
  FormGroup,
  PanelLeft,
  isBrowser,
  InputGroup,
  LoremIpsum,
  PanelRight,
  PanelHeader,
  FormControl,
  PanelContainer,
  PanelTabContainer,
} from '@sketchpixy/rubix';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invited: this.props.invited ? true : false,
      invitedText: this.props.invited ? 'invited' : 'invite'
    };
  }
  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      invited: !this.state.invited,
      invitedText: (!this.state.invited) ? 'invited': 'invite'
    });
  }
  render() {
    return (
      <tr>
        <td style={{verticalAlign: 'middle', borderTop: this.props.noBorder ? 'none': null}}>
          <img src={`/imgs/app/avatars/${this.props.avatar}.png`} />
        </td>
        <td style={{verticalAlign: 'middle', borderTop: this.props.noBorder ? 'none': null}}>
          {this.props.name}
        </td>
        <td style={{verticalAlign: 'middle', borderTop: this.props.noBorder ? 'none': null}} className='text-right'>
          <Button onlyOnHover bsStyle='orange' active={this.state.invited} onClick={::this.handleClick}>
            {this.state.invitedText}
          </Button>
        </td>
      </tr>
    );
  }
}

class WeatherPanel extends React.Component {
  componentDidMount() {
    $('#datetimepicker1-parent').datetimepicker({
      inline: true,
    });
    $("#datetimepicker1-parent").on("dp.change", function (e) {
      if($('#container').hasClass('container-open')){
          $('#container').removeClass('container-open');
          $('#notification_btn').show();
          e.preventDefault();
      }
    });
  }

  exampleFunction(){
    console.log('testing');
  }
  render() {
    return (
      <PanelContainer>
        <Panel horizontal className='force-collapse'>
          <PanelBody className='panel-sm-7' style={{padding: 0}}>
            <div id='datetimepicker1-parent' className='datetimepicker-inline'></div>
          </PanelBody>
          <PanelRight className='panel-sm-5 bg-brown50 fg-white' style={{verticalAlign: 'middle'}}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <div className='text-center'>
                    <Icon glyph='climacon rain cloud' style={{fontSize: '800%', lineHeight: 0}} />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={6} collapseRight>
                  <h4>Max: 25°</h4>
                </Col>
                <Col xs={6} collapseLeft className='text-right'>
                  <h4>Min: 22°</h4>
                </Col>
              </Row>
              <Row>
                <Col xs={12} className='text-center'>
                  <h5>Thundershower</h5>
                  <h6>Wind: 9 km/h | Humidity: 91%</h6>
                </Col>
              </Row>
            </Grid>
          </PanelRight>
        </Panel>
      </PanelContainer>
    );
  }
}

export default class Application2 extends React.Component {
  render() {
    return (
      <div className='dashboard'>
        <Row>
          <Col sm={12}>
            <PanelTabContainer id='dashboard-main' defaultActiveKey="demographics">
              <Panel>
                <WeatherPanel />
              </Panel>
            </PanelTabContainer>
          </Col>
        </Row>
      </div>
    );
  }
}
