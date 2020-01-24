﻿import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';
import {MobileEvents} from './events';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
    filter: PropTypes.string,
    clients:PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        editmode: PropTypes.bool.isRequired,
        name_f: PropTypes.string.isRequired,
        name_n: PropTypes.string.isRequired,
        name_o: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
      })
    ),
  };

  state = {
    name: this.props.name,
    filter: 'all',
    clients: this.props.clients,
  };

  componentDidMount = () => {
    MobileEvents.addListener('ChangeCompanyName',this.setCompanyName);
    MobileEvents.addListener('ChangeFilter',this.setCompanyFilter);
    MobileEvents.addListener('AddClient',this.addClient);
  };

  componentWillUnmount = () => {
    MobileEvents.removeListener('ChangeCompanyName',this.setCompanyName);
    MobileEvents.removeListener('ChangeFilter',this.setCompanyFilter);
    MobileEvents.removeListener('AddClient',this.addClient);
  };

  addClient = () => {
    console.log("add client");
    let newClients=[...this.state.clients]; // копия самого массива клиентов

    let newID = newClients[0].id;
    newClients.forEach( (c,i) => {
      if ( c.id>newID ) {
        newID = c.id 
      }
    } );
    newID++;
    
    newClients.push({
      id: newID,
      editmode: true,
      name_f: "",
      name_n: "",
      name_o: "",
      status: "active",
      balance: 0,
    });
    this.setState({clients: newClients});
  };

  setCompanyName = (cname) => {
    this.setState({name: cname});
  };

  setCompanyFilter = (fname) => {
    console.log("set filter "+fname);
    this.setState({filter: fname});
  };

  setName1 = () => {
//    this.setState({name:'МТС'});
    MobileEvents.emit('ChangeCompanyName', 'МТС');
  };

  setName2 = () => {
//    this.setState({name:'Velcom'});
    MobileEvents.emit('ChangeCompanyName', 'Velcom');
  };
  
  setBalance = (clientId,newBalance) => {
    let newClients=[...this.state.clients]; // копия самого массива клиентов
    newClients.forEach( (c,i) => {
      if ( c.id==clientId ) {
      //if ( c.id==clientId && c.balance!=newBalance ) {
        let newClient={...c}; // копия хэша изменившегося клиента
        newClient.balance=newBalance;
        newClients[i]=newClient;
      }
    } );
    this.setState({clients:newClients});
  };

  updateClient = () => {
    let newClients=[...this.state.clients]; // копия самого массива клиентов
    this.setState({clients:newClients});
  }

  clientAdd = () => {
    MobileEvents.emit('AddClient');
  };

  filterAll = () => {
    MobileEvents.emit('ChangeFilter', 'all');
  };
  
  filterActive = () => {
    MobileEvents.emit('ChangeFilter', 'active');
  };
  
  filterBlock = () => {
    MobileEvents.emit('ChangeFilter', 'blocked');
  };
  
  render() {
    console.log("MobileCompany render");

    var clientsWithFilter = this.state.clients.filter(x => (x.status === this.state.filter) || (this.state.filter === 'all'));

    var clientsCode=clientsWithFilter.map( client =>
      <MobileClient key={client.id} info={client} cdUpdate={this.updateClient} />
    );

    return (
      <div className='MobileCompany'>
        <input type="button" value="=МТС" onClick={this.setName1} />
        <input type="button" value="=Velcom" onClick={this.setName2} />
        <div className='MobileCompanyName'>Компания &laquo;{this.state.name}&raquo;</div>
        <div className='MobileCompanyButtonsHeader'>
          <input type="button" value="Все" onClick={this.filterAll} />
          <input type="button" value="Активные" onClick={this.filterActive} />
          <input type="button" value="Заблокированные" onClick={this.filterBlock} />
        </div>
        <div className='MobileCompanyClientsHeader'>
          <table className='MobileClientTableHeader'>
            <thead>
              <tr>
                <th width='100px'>Фамилия</th>
                <th width='100px'>Имя</th>
                <th width='100px'>Отчество</th>
                <th width='70px'>Баланс</th>
                <th width='70px'>Статус</th>
                <th width='100px'>Редактировать</th>
                <th width='100px'>Удалить</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className='MobileCompanyClients' ref={this.inputRef}>
          {clientsCode}
        </div>
        <input type="button" value="Добавить клиента" onClick={this.clientAdd} />
      </div>
    )
    ;

  }
}

export default MobileCompany;
