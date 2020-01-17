import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';
import {MobileEvents} from './events';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
    clients:PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
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
    clients: this.props.clients,
  };

  componentDidMount = () => {
    MobileEvents.addListener('ChangeCompanyName',this.setCompanyName);
  };

  componentWillUnmount = () => {
    MobileEvents.removeListener('ChangeCompanyName',this.setCompanyName);
  };

  setCompanyName = (cname) => {
    this.setState({name: cname});
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

  /*
  setBalance = (clientId,newBalance) => {
    let changed=false;
    let newClients=[...this.state.clients]; // копия самого массива клиентов
    newClients.forEach( (c,i) => {
      if ( c.id==clientId && c.balance!=newBalance ) {
        let newClient={...c}; // копия хэша изменившегося клиента
        newClient.balance=newBalance;
        newClients[i]=newClient;
        changed=true;
      }
    } );
    if ( changed )
      this.setState({clients:newClients});
  };
  */
  
  setBalance1 = () => {
    this.setBalance(105,230);
  };

  setBalance2 = () => {
    this.setBalance(105,250);
  };

  clientAdd = () => {
    console.log("clientAdd");
  };

  filterAll = () => {
    console.log("filterAll");
  };
  
  filterActive = () => {
    console.log("filterActive");
  };
  
  filterBlock = () => {
    console.log("filterBlock");
  };
  
  render() {
    console.log("MobileCompany render");

    var clientsCode=this.state.clients.map( client =>
      <MobileClient key={client.id} info={client}  />
    );

    return (
      <div className='MobileCompany'>
        <input type="button" value="=МТС" onClick={this.setName1} />
        <input type="button" value="=Velcom" onClick={this.setName2} />
        <div className='MobileCompanyName' ref='r1'>Компания &laquo;{this.state.name}&raquo;</div>
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
        <div className='MobileCompanyClients'>
          {clientsCode}
        </div>
        <input type="button" value="Добавить клиента" onClick={this.clientAdd} />
      </div>
    )
    ;

  }
}

export default MobileCompany;
