import React from 'react';
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
    let client1=[...this.state.clients]; // копия самого массива клиентов

    let newID = client1[0].id;
    client1.forEach( (c,i) => {
      if ( c.id>newID ) {
        newID = c.id 
      }
    } );
    newID++;

    client1.push({
      id: newID,
      editmode: true,
      name_f: "",
      name_n: "",
      name_o: "",
      status: "active",
      balance: "",
    });

    this.setState({clients: client1});
  };

  setCompanyName = (cname) => {
    this.setState({name: cname});
  };

  setCompanyFilter = (fname) => {
    console.log("set filter "+fname);
    this.setState({filter: fname});
  };

  setName1 = () => {
    MobileEvents.emit('ChangeCompanyName', 'МТС');
  };

  setName2 = () => {
    MobileEvents.emit('ChangeCompanyName', 'Velcom');
  };
  
  setBalance = (clientId,newBalance) => {
    let newClients=[...this.state.clients]; // копия самого массива клиентов
    newClients.forEach( (c,i) => {
      if ( c.id==clientId ) {
        let newClient={...c}; // копия хэша изменившегося клиента
        newClient.balance=newBalance;
        newClients[i]=newClient;
      }
    } );
    this.setState({clients:newClients});
  };

  updateClient = (clientId,fieldname,newvalue) => {
    var newInfo = {clientId: clientId,fieldname: fieldname, newvalue: newvalue};
    let newClients=[...this.state.clients]; // копия самого массива клиентов

    for (var i=0; i<newClients.length; i++) {
        if (newClients[i].id==clientId) {
          newClients[i][fieldname] = newvalue;  
        }
    }

    newClients = newClients.filter(x => (x.status != 'delete'));

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
    var client2 = [];
    for(var i=0; i<clientsWithFilter.length; i++) {
      var cl = {id: clientsWithFilter[i].id, 
                editmode: clientsWithFilter[i].editmode, 
                name_f: clientsWithFilter[i].name_f, 
                name_n: clientsWithFilter[i].name_n, 
                name_o: clientsWithFilter[i].name_o, 
                status: clientsWithFilter[i].status, 
                balance: clientsWithFilter[i].balance};
      client2[i] = cl;
    }

    var clientsCode=client2.map( client =>
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
