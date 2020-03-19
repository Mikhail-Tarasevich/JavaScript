import React from 'react';
import PropTypes from 'prop-types';

import './GoodList.css';
import {ShopEvents} from './events';

class Good extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state.isDelete = false;
  };

  static propTypes = {
    isDelete: PropTypes.bool,
    isSelect: PropTypes.bool,
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
      isDelete: this.props.isDelete,
      isSelect: this.props.isSelect,
      id: this.props.id,
      url: this.props.url,
      name: this.props.name,
      count: this.props.count,
      price: this.props.price,
  };

  actionDelete = () => {
    console.log("delete Good "+this.props.id);
    this.state.isDelete = true;
    ShopEvents.emit('DeleteGood', this.state.id);
  };

  actionSelect = () => {
    if (!this.state.isDelete) {
      console.log("select Good "+this.props.id);
      ShopEvents.emit('SelectGood', this.state.id);
    }
  };

  render() {
    console.log("render Good "+this.props.id);
    var style = this.props.isSelect ? { backgroundColor: 'red'} : { backgroundColor: 'cyan'};

    return(
      <div className='Good'>
        <table className='GoodTable'>
          <thead>
            <tr onClick={this.actionSelect} style={style}>
              <td><div><input className='cellText' size='85' type="text" readOnly={true} defaultValue={this.state.name}/></div></td>
              <td><div><input className='cellText' size='5' type="text" readOnly={true} defaultValue={this.state.price}/></div></td>
              <td><div><input className='cellText' size='20' type="text" readOnly={true} defaultValue={this.state.url}/></div></td>
              <td><div><input className='cellText' size='5' type="text" readOnly={true} defaultValue={this.state.count}/></div></td>
              <td className='GoodEdit' align='center' width='100px'><input type="button" value="Edit" onClick={this.actionDelete}/></td>
              <td className='GoodDelete' align='center' width='100px'><input type="button" value="Delete" onClick={this.actionDelete}/></td>
            </tr>
          </thead>
        </table>
      </div>
    );
  };

};

export default Good;