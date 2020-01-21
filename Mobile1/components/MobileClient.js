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
      editmode: PropTypes.bool.isRequired,
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

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ value: inputRef.current.value})
  };

  componentDidMount = () => {
    MobileEvents.addListener('EditClient',this.clientEditProcess);
    MobileEvents.addListener('DeleteClient',this.clientDeleteProcess);
    MobileEvents.addListener('StatusClient',this.clientSetStatus);
  };

  componentWillUnmount = () => {
    MobileEvents.removeListener('EditClient',this.clientEditProcess);
    MobileEvents.removeListener('DeleteClient',this.clientDeleteProcess);
    MobileEvents.removeListener('StatusClient',this.clientSetStatus);
  };

  clientSetStatus = (cid) => {
    console.log("Status client id="+cid);

    var client1 = Object.assign({}, this.state);
    client1.info.status = (client1.info.status=='active') ? 'blocked' : 'active';
//    var client2 = client1.set('info', client1.get('info'))

//    this.setState({info: client2.get('info')})
      this.setState({info: client1.info})
  };

  clientEditProcess = (cid) => {
    console.log("Edit client id="+cid);

    //var client = Object.assign({}, this.state);

    var client1 = Immutable.Map(Object.assign({}, this.state));
     client1.get('info').editmode = (client1.get('info').id==cid) ? true : false;
//    if (client.info.id==cid) {
  //    client.info.editmode = true;
    //} else {
//      client.info.editmode = false;
  //  };

var client2 = client1.set('info', client1.get('info'))

    this.setState({info: client2.get('info')})
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

  clientChangeStatus = () => {
    MobileEvents.emit('StatusClient', this.state.info.id);
  };
  
  componentWillReceiveProps = (newProps) => {
    console.log("MobileClient id="+this.props.info.id+" componentWillReceiveProps");
    this.setState({info:newProps.info});
  };

  render() {

    const { defaultValue, value, onChange } = this.props
    const nothing = () => {}
    
    console.log("MobileClient id="+this.state.info.id+" render");

    var client = Immutable.Map(Object.assign({}, this.state));
    var clientStatusBGColor = (client.get('info').status=="active") ? 'green' : 'red';

    return (
      <div className='MobileClient'>
        <table className='MobileClientTable'>
          <thead>
            <tr>
              <td align='left'><div><input className='cellText' type="text" readOnly={!client.get('info').editmode} defaultValue={client.get('info').name_f}/></div></td>
              <td align='left'><div><input className='cellText' type="text" readOnly={!client.get('info').editmode} defaultValue={client.get('info').name_n}/></div></td>
              <td align='left'><div><input className='cellText' type="text" readOnly={!client.get('info').editmode} defaultValue={client.get('info').name_o}/></div></td>
              <td className='MobileClientStatus' align='center' width='70px' bgcolor={clientStatusBGColor} onClick={this.clientChangeStatus}>{client.get('info').status}</td>
              <td align='center'><div><input className='cellNumber' type="text" readOnly={!client.get('info').editmode} defaultValue={client.get('info').balance}/></div></td>
              <td className='MobileClientEdit' align='center' width='100px'><input type="button" value="Редактировать" onClick={this.clientEdit}/></td>
              <td className='MobileClientDelete' align='center' width='100px'><input type="button" value="Удалить" onClick={this.clientDelete}/></td>

              

            </tr>
          </thead>
        </table>
      </div>
    );
  }

}

export default MobileClient;
