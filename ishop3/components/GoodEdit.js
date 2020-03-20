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
    
        return(
          <div className='GoodEdit'>
            <br></br>
            <table className='GoodTable'>
              <thead>
                <tr><td><div><input className='cellText' size='85' type="text" readOnly={true} defaultValue={this.state.name}/></div></td></tr>
                <tr><td><div><input className='cellText' size='5' type="text" readOnly={true} defaultValue={this.state.price}/></div></td></tr>
                <tr><td><div><input className='cellText' size='20' type="text" readOnly={true} defaultValue={this.state.url}/></div></td></tr>
                <tr><td><div><input className='cellText' size='5' type="text" readOnly={true} defaultValue={this.state.count}/></div></td></tr>
                <tr><td className='GoodEditButtons' width='100px'><input type="button" value="Save" onClick={this.actionSave}/> <input type="button" value="Cancel" onClick={this.actionCancel}/></td></tr>
              </thead>
            </table>
          </div>
        );
    };

};

export default GoodEdit;