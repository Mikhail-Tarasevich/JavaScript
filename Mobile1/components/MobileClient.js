import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {MobileEvents} from './events';

import Immutable from 'immutable';

import styles from './MobileClient.css';

class MobileClient extends React.PureComponent {

  static propTypes = {
    info:PropTypes.shape({
      id: PropTypes.number.isRequired,
      name_f: PropTypes.string.isRequired,
      name_n: PropTypes.string.isRequired,
      name_o: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }),
  };

  state = {
    info: this.props.info,
  };

  componentDidMount = () => {
    MobileEvents.addListener('EditClient',this.clientEditProcess);
    MobileEvents.addListener('DeleteClient',this.clientDeleteProcess);
  };

  componentWillUnmount = () => {
    MobileEvents.removeListener('EditClient',this.clientEditProcess);
    MobileEvents.removeListener('DeleteClient',this.clientDeleteProcess);
  };

  clientEditProcess = (cid) => {
    console.log("Edit client id="+cid);
  };

  clientDeleteProcess = (cid) => {
    console.log("Delete client id="+cid);
    this.setState({status:'delete'});
  };

  clientDelete = () => {
    MobileEvents.emit('DeleteClient', this.state.info.id);
  };

  clientEdit = () => {
    MobileEvents.emit('EditClient', this.state.info.id);
  };

  componentWillReceiveProps = (newProps) => {
    console.log("MobileClient id="+this.props.info.id+" componentWillReceiveProps");
    this.setState({info:newProps.info});
  };

  render() {

    const { defaultValue, value, onChange } = this.props
    const nothing = () => {}
    
    console.log("MobileClient id="+this.state.info.id+" render");

    var clients = Immutable.Map(Object.assign({}, this.state));
    var clientStatusBGColor = (clients.get('info').status=="active") ? 'green' : 'red';

    return (
      <div className='MobileClient'>
        <table className='MobileClientTable'>
          <thead>
            <tr>
              <td align='left'><div><input className='cellText' type="text" readOnly={true} defaultValue={clients.get('info').name_f}/></div></td>
              <td align='left'><div><input className='cellText' type="text" readOnly={true} defaultValue={clients.get('info').name_n}/></div></td>
              <td align='left'><div><input className='cellText' type="text" readOnly={true} defaultValue={clients.get('info').name_o}/></div></td>
              <td className='MobileClientStatus' align='center' width='70px' bgcolor={clientStatusBGColor}>{clients.get('info').status}</td>
              <td className='MobileClientBalance' align='center' width='70px'>{clients.get('info').balance}</td>
              <td className='MobileClientEdit' align='center' width='100px'><input type="button" value="Редактировать" onClick={this.clientEdit}/></td>
              <td className='MobileClientDelete' align='center' width='100px'><input type="button" value="Удалить" onClick={this.clientDelete}/></td>

              

            </tr>
          </thead>
        </table>
      </div>
    );
    /*
    return (
      <div className='MobileClient'>
        <table className='MobileClientTable'>
          <thead>
            <tr>
              <td className='MobileClientF' align='left' width='100px'>{clients.get('info').name_f}</td>
              <td className='MobileClientN' align='left' width='100px'>{clients.get('info').name_n}</td>
              <td className='MobileClientO' align='left' width='100px'>{clients.get('info').name_o}</td>
              <td className='MobileClientStatus' align='center' width='70px' bgcolor={clientStatusBGColor}>{clients.get('info').status}</td>
              <td className='MobileClientBalance' align='center' width='70px'>{clients.get('info').balance}</td>
              <td className='MobileClientEdit' align='center' width='100px'><input type="button" value="Редактировать" onClick={this.clientEdit}/></td>
              <td className='MobileClientDelete' align='center' width='100px'><input type="button" value="Удалить" onClick={this.clientDelete}/></td>
            </tr>
          </thead>
        </table>
      </div>
    );
*/
  }

}

export default MobileClient;
