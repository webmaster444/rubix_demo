import React from 'react';


export default class Panelunit extends React.Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <div className="panelunit_container">
        <div className="panelunit_header">
          {this.props.title}
        </div>
        <div className="panelunit_body">
          {this.props.children}
        </div>
      </div>
    );
  }
}
