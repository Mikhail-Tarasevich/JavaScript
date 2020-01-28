﻿import React from 'react';
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
    cdUpdate: PropTypes.func,
  };

  state = {
    info: this.props.info,
    cdUpdate: this.props.cdUpdate,
  };

  actionUpdate = () => {
    console.log("actionUpdate");
    this.state.cdUpdate();
  };

  handleSubmit = e => {
    console.log("handleSubmit");
    e.preventDefault();
    this.setState({ value: inputRef.current.value})
  };

  componentDidMount = () => {
    console.log("componentDidMount");
    MobileEvents.addListener('EditClient',this.clientEditProcess);
    MobileEvents.addListener('DeleteClient',this.clientDeleteProcess);
    MobileEvents.addListener('StatusClient',this.clientSetStatus);
  };

  componentWillUnmount = () => {
    console.log("componentWillUnmount");
    MobileEvents.removeListener('EditClient',this.clientEditProcess);
    MobileEvents.removeListener('DeleteClient',this.clientDeleteProcess);
    MobileEvents.removeListener('StatusClient',this.clientSetStatus);
  };

  clientSetStatus = (cid) => {
    console.log("clientSetStatus id="+cid);
//    версия 1
    var client1 = {...this.state.info}; // копия самого массива клиентов
    client1.status = (client1.status=='active') ? 'blocked' : 'active';

//    версия 2
//    var client1 = Object.assign({}, this.state);
//    var client2 = client1.set('info', client1.get('info'))
//    this.setState({info: client2.get('info')})

//    версия 3
/*
    var client1 = Immutable.Map(Object.assign({}, this.state));
    var newstatus = (client1.get('info').status=='active') ? 'blocked' : 'active';
    var newinfo = client1.get('info');
    newinfo.status = newstatus;
    var client2 = client1.set('info', newinfo);
*/
      this.setState({info: client1});
      this.actionUpdate();
  };

  clientEditProcess = (cid) => {
    console.log("clientEditProcess id="+cid);

    var client1 = Immutable.Map(Object.assign({}, this.state));
    client1.get('info').editmode = (client1.get('info').id==cid) ? true : false;
    var client2 = client1.set('info', client1.get('info'))

    this.setState({info: client2.get('info')});
    this.actionUpdate();
  };

  clientDeleteProcess = (cid) => {
    console.log("clientDeleteProcess id="+cid);
    this.setState({status:'delete'});
    this.actionUpdate();
  };

  clientDelete = () => {
    console.log("clientDelete");
    MobileEvents.emit('DeleteClient', this.state.info.id);
  };

  clientEdit = () => {
    console.log("clientEdit");
    MobileEvents.emit('EditClient', this.state.info.id);
  };

  clientChangeStatus = () => {
    console.log("clientChangeStatus");
    MobileEvents.emit('StatusClient', this.state.info.id);
  };
  
  componentWillReceiveProps = (newProps) => {
    console.log("componentWillReceiveProps id="+this.props.info.id);
    this.setState({info:newProps.info});
  };

  render() {

    const { defaultValue, value, onChange } = this.props
    const nothing = () => {}
    
    console.log("render MobileClient id="+this.state.info.id);

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
