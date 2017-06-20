import React from 'react';


export default class LabelBtn extends React.Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <div className="label_container" style={{background: this.props.color}}>
        {this.props.children}
      </div>
    );
  }
}
