import React from 'react';
import PropTypes from 'prop-types';

class BR2JSX extends React.Component {

  static propTypes = {
    colors: PropTypes.array.isRequired,
  };
  
  render() {
    let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
    let res = null;
    if (this.props.colors.length==1) {
      res = <div style={{border:"solid 5px "+this.props.colors[0],padding:"10px"}}>
              {this.props.children}
            </div>
    }
    else {
      res = <div style={{border:"solid 5px "+this.props.colors[this.props.colors.length-1],padding:"10px"}}>
              <BR2JSX colors={this.props.colors.slice(0, this.props.colors.length-1)}>
                {this.props.children}
              </BR2JSX>
            </div>
    }

    return res;
  }

}

export default BR2JSX;
