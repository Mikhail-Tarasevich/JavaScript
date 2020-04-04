import React from 'react';
import PropTypes from 'prop-types';

import './GoodEdit.css';

class GoodEdit extends React.PureComponent {
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
        console.log("render GoodEdit "+this.props.id);

        var b1 = <input type="button" value="Save" onClick={this.actionSave}/>;
        var b2 = <input type="button" value="Cancel" onClick={this.actionCancel}/>;
        var b3 = <input type="button" value="Add" onClick={this.actionAdd}/>;
        var buttons = (this.state.mode=='new') ? <div>{b3} {b2}</div> : <div>{b1} {b2}</div>;
    
        return(
          <div className='GoodEdit'>
            <p><b>Edit existing product</b></p>

            <table className='GoodTable'>
              <thead>
                <tr><td><div>ID: {this.state.id}</div></td></tr>
                <tr><td><div><input className='cellText' size='85' type="text" defaultValue={this.state.name}/></div></td></tr>
                <tr><td><div><input className='cellText' size='5' type="text" defaultValue={this.state.price}/></div></td></tr>
                <tr><td><div><input className='cellText' size='20' type="text" defaultValue={this.state.url}/></div></td></tr>
                <tr><td><div><input className='cellText' size='5' type="text" defaultValue={this.state.count}/></div></td></tr>
                <tr><td className='GoodEditButtons' width='100px'>{buttons}</td></tr>
              </thead>
            </table>
          </div>
        );
    };

};

export default GoodEdit;