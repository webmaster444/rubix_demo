import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

// import actions from '../../redux/actions';

import {
  Row,
  Col,
  Grid,
  Panel,
  PanelHeader,
  PanelFooter,
  PanelBody,
  PanelContainer,
  Icon,
  Button,
  SplitButton,
  MenuItem,
  Form,
  Label,
  Table,
  FormGroup,
  InputGroup,
  FormControl
} from '@sketchpixy/rubix';

import Header from '../common/header';


export default class Status extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Row>
          <Col sm={8} collapseRight>
            <MapPanel />
          </Col>
          <Col sm={4}>
            <VehicleInfoPanel driver="Stephen Tan" numberPlate="SHC1732Y" makeModel="Mazda 3" address1="16 Purvis St" address2="188595"/>
            <VehicleStatusPanel engineState="ON" engineStateUpdated="29 March 2017 15:34"/>
          </Col>
        </Row>
        <Row>
          <Col sm={6} collapseRight>
            <TripStatusPanel />
          </Col>
        </Row>
      </div>
    );
  }
}

class MapPanel extends React.Component{
  geoCode(address) {
    GMaps.geocode({
      address: address,
      callback: (results, status) => {
        if (status == 'OK') {
          var latlng = results[0].geometry.location;
          this.geocode.setCenter(latlng.lat(), latlng.lng());
          this.geocode.addMarker({
            lat: latlng.lat(),
            lng: latlng.lng(),
            infoWindow: {
              content: '<div><strong>Address:</strong> '+results[0].formatted_address+'</div>'
            }
          });
        }
      }
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.geoCode($('#address').val());
  }
  componentDidMount() {
    (() => {
      this.geocode = new GMaps({
        scrollwheel: false,
        div: '#geocode',
        zoom: 16,
        lat: -12.043333,
        lng: -77.028333
      });
      this.geoCode('New York, NY, USA');
    })();
  }
  render() {
    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{padding: 25}}>
            <div id="geocode" style={{height: 500}} ></div>
          </PanelBody>
        </Panel>
      </PanelContainer>
    )
  }
}

class StatusRow extends React.Component {
  render() {
    return (
      <tr>
        <td className='text-left'>{this.props.name}</td>
        <td className='text-right'>
          <Label className={'badge ' + this.props.colour  + ' ' + this.props.badge + ' fg-white'}> {"\u00a0" + this.props.state + "\u00a0"} </Label>
        </td>
        <td className='text-right'><span className='fg-green'>{this.props.updated}</span></td>
      </tr>
    );
  }
}

class VehicleStatusPanel extends React.Component {

  render() {
    var engineStatusColor = this.props.engineState == "ON" ? "bg-blue" : "bg-red";
    return (
      <PanelContainer noOverflow>
        <Panel>
          <PanelHeader className='bg-orange fg-white' style={{paddingLeft: 25}}>
            <Grid>
              <Row>
                <h3>Vehicle Status</h3>
              </Row>
            </Grid>
          </PanelHeader>
          <PanelBody style={{padding: 25}}>
            <Table striped collapseBottom>
              <thead>
		<tr>
                  <th data-tablesaw-priority='persist'>Component</th>
                  <th data-tablesaw-priority='1' className='text-right'>Status</th>
                  <th data-tablesaw-priority='2' className='text-right'>Updated</th>
		</tr>
              </thead>
              <tbody>
		<StatusRow name="Engine" state={this.props.engineState} updated={this.props.engineStateUpdated} colour={engineStatusColor} badge="badge-primary"/>
		<StatusRow name="Speed" state="0 Km/h" updated="29 March 2017 15:34" colour="bg-red" badge="badge-primary"/>
		<StatusRow name="Health" state="OK" updated="30 March 2017 18:00" colour="bg-green" badge="badge-warning"/>
		<StatusRow name="Maintenance" state="OK" updated="30 March 2017 18:00" colour="bg-green" badge="badge-danger"/>
              </tbody>
            </Table>
          </PanelBody>
        </Panel>
      </PanelContainer>
    );
  }
}

class TripStatusPanel extends React.Component {
  render() {
    return (
      <PanelContainer>
        <Panel>
          <PanelHeader className='bg-blue fg-white' style={{paddingLeft: 25}}>
            <Grid>
              <Row>
                <h3>Trip Status</h3>
              </Row>
            </Grid>
          </PanelHeader>
          <PanelBody style={{padding: 25}}>
            <Table striped collapseTop>
              <thead>
                <tr>
                  <th data-tablesaw-priority='persist'>Information</th>
                  <th data-tablesaw-priority='1' className='text-right'>Value</th>
                  <th data-tablesaw-priority='2' className='text-right'>Updated</th>
                </tr>
              </thead>

              <tbody>
                <StatusRow name="Start Time" state="29 March 2017 15:34" updated="" colour="bg-green" badge="badge-primary"/>
                <StatusRow name="Distance" state="34.5 Km" updated="30 March 2017 18:00" colour="bg-green" badge="badge-warning"/>
                <StatusRow name="Duration" state="27:01" updated="" colour="bg-green" badge="badge-danger"/>
                <StatusRow name="Average Speed" state="0 Km/h" updated="29 March 2017 15:34" colour="bg-red" badge="badge-primary"/>
              </tbody>
            </Table>
          </PanelBody>
        </Panel>
      </PanelContainer>
    );
  }
}



class VehicleInfoPanel extends React.Component {
  render() {
    return (
      <PanelContainer>
        <Panel>
          <PanelHeader className='bg-purple fg-white' style={{paddingLeft: 25}}>
            <Grid>
              <Row>
                <h3>{this.props.numberPlate}</h3>
              </Row>
              <Row>
                <h4>{this.props.makeModel}</h4>
              </Row>
            </Grid>
          </PanelHeader>
          <PanelBody className='fg-grey' style={{paddingLeft: 25}}>
            <Grid>
              <Row>
                <h4>{this.props.address1}</h4>
                <h5>{this.props.address2}</h5>
              </Row>
            </Grid>
          </PanelBody>
          <PanelFooter className='bg-lightpurple fg-white' style={{paddingLeft: 25}}>
            <Grid>
              <Row>
                <h4>{this.props.driver}</h4>
              </Row>
            </Grid>
          </PanelFooter>
        </Panel>
      </PanelContainer>
    );
  }
}


class DriverNamePanel extends React.Component{
  render() {
    return (
      <PanelContainer>
        <Panel>
          <PanelHeader className='bg-darkblue'>
            <Grid>
              <Row>
                <Col xs={12} className='fg-white'>
                  <h3>Driver Name</h3>
                </Col>
              </Row>
            </Grid>
          </PanelHeader>
          <PanelBody >
            <Grid>
              <Row>
                <Col xs={4} className='fg-black75'>
                  <h4>Driver Name</h4>
                </Col>
                <Col xs={8}>
                  <h4>SGX 4553Y</h4>
                </Col>
              </Row>
              <Row>
                <Col xs={4} className='fg-black75'>
                  <h4>Last Seen</h4>
                </Col>
                <Col xs={8}>
                  <h4>1 May 2017 09:35</h4>
                </Col>
              </Row>
              <Row>
                <Col xs={4} className='fg-black75'>
                  <h4>Honda Vezel</h4>
                </Col>
                <Col xs={8}>
                  <h4></h4>
                </Col>
              </Row>
            </Grid>
          </PanelBody>
        </Panel>
      </PanelContainer>
    )
  }
}
