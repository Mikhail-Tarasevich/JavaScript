import React from 'react';
import PropTypes from 'prop-types';

import './GoodInfo.css';

class GoodInfo extends React.PureComponent {
    static propTypes = {
        url: PropTypes.string,
        name: PropTypes.string,
        count: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ]),
        price: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ]),
    };
    
    state = {
        id: this.props.id,
        url: this.props.url,
        name: this.props.name,
        count: this.props.count,
        price: this.props.price,
    };

    render() {
        console.log("render GoodInfo "+this.props.id);
    
        return(
          <div className='GoodInfo'>
              <br></br>
              <p><b>Product {this.state.name}</b></p>

              <p>Price: <b>{this.state.price}</b></p>
              <p>{this.state.url}</p>
          </div>
        );
    };

};

export default GoodInfo;