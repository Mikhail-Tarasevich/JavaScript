import React from 'react';
import PropTypes from 'prop-types';

class RainbowFrame extends React.Component {

  static propTypes = {
    color: PropTypes.string.isRequired,
    //colors: PropTypes.array.isRequired,
  };
  
  render() {
//    let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
    return (
      <div style={{border:"solid 5px "+this.props.color,padding:"10px"}}>
        {this.props.children}
      </div>
    );
  }

}

export default RainbowFrame;
