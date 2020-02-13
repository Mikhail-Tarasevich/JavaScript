import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import {MobileEvents} from './events';

import u from 'updeep'; 

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
      balance: PropTypes.string.isRequired,
    }),
    cdUpdate: PropTypes.func,
  };

  state = {
    info: this.props.info,
    cdUpdate: this.props.cdUpdate,
  };

  actionUpdate = (clientId,fieldname,newvalue) => {
    console.log("actionUpdate");
    this.state.cdUpdate(clientId,fieldname,newvalue);
  };

  handleSubmit = e => {
    console.log("handleSubmit");
    e.preventDefault();
    this.setState({ value: inputRef.current.value})
  };

  clientChangeEnd = () => {
    console.log("clientChangeEnd");
    // если клиент находится в режиме редактирования и все поля заполнены, то завершаем редактирование - переводим клиента в режим чтения
    if (this.state.info.editmode==true && !(this.name_f_Ref.value=='' | this.name_o_Ref.value=='' | this.name_n_Ref.value=='' | this.newBalanceRef.value=='')) {
      MobileEvents.emit('EditClient', this.state.info.id);
    }
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
    this.setState({info:newProps.info});
  };

  newBalanceRef = null;
  name_o_Ref = null;
  name_f_Ref = null;
  name_n_Ref = null;

  setNewBalance = (ref) => {
    this.newBalanceRef=ref;
  };

  getName_F = (ref) => {
    this.name_f_Ref=ref;
  };

  getName_N = (ref) => {
    this.name_n_Ref=ref;
  };

  getName_O = (ref) => {
    this.name_o_Ref=ref;
  };

  render() {
    console.log("render MobileClient id="+this.state.info.id);

    var clientStatusBGColor = (this.state.info.status=="active") ? 'green' : 'red';
    var clientClassNameInputText = (this.state.info.editmode) ? 'cellTextEdit' : 'cellText';
    var clientClassNameInputNumber = (this.state.info.editmode) ? 'cellNumberEdit' : 'cellNumber';

    return (
      <div className='MobileClient'>
        <table className='MobileClientTable'>
          <thead>
            <tr>
              <td align='left'><div><input className={clientClassNameInputText} type="text" readOnly={!this.state.info.editmode} onBlur={this.clientChangeEnd} defaultValue={this.state.info.name_f}  ref={this.getName_F}/></div></td>
              <td align='left'><div><input className={clientClassNameInputText} type="text" readOnly={!this.state.info.editmode} onBlur={this.clientChangeEnd} defaultValue={this.state.info.name_n}  ref={this.getName_N}/></div></td>
              <td align='left'><div><input className={clientClassNameInputText} type="text" readOnly={!this.state.info.editmode} onBlur={this.clientChangeEnd} defaultValue={this.state.info.name_o}  ref={this.getName_O}/></div></td>
              <td align='center'><div><input className={clientClassNameInputText} type="text" readOnly={!this.state.info.editmode} onBlur={this.clientChangeEnd}  defaultValue={this.state.info.balance}  ref={this.setNewBalance}/></div></td>
              <td className='MobileClientStatus' align='center' width='70px' bgcolor={clientStatusBGColor} onClick={this.clientChangeStatus}>{this.state.info.status}</td>
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

