import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';
import {MobileEvents} from './events';

import u from 'updeep'; 

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
        balance: PropTypes.string.isRequired,
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
    MobileEvents.addListener('EditClient',this.clientEditProcess);
    MobileEvents.addListener('DeleteClient',this.clientDeleteProcess);
    MobileEvents.addListener('StatusClient',this.clientSetStatus);
  };

  componentWillUnmount = () => {
    MobileEvents.removeListener('ChangeCompanyName',this.setCompanyName);
    MobileEvents.removeListener('ChangeFilter',this.setCompanyFilter);
    MobileEvents.removeListener('AddClient',this.addClient);
    MobileEvents.removeListener('EditClient',this.clientEditProcess);
    MobileEvents.removeListener('DeleteClient',this.clientDeleteProcess);
    MobileEvents.removeListener('StatusClient',this.clientSetStatus);
  };

  clientEditProcess = (cid) => {
    console.log("clientEditProcess id="+cid);

    let newClients=[...this.state.clients]; // копия самого массива клиентов

    for (var i=0; i<newClients.length; i++) {
        if (newClients[i].id==cid) {
          var client1 = Object.assign({}, newClients);
          var newEditMode = !client1[i].editmode;
          var client2 = u({'editmode': newEditMode}, client1[i]);
          newClients[i] = client2;
          this.setState({clients: newClients});
          break;
        }
    }
  };

  clientSetStatus = (cid) => {
    console.log("clientSetStatus id="+cid);

    let newClients=[...this.state.clients]; // копия самого массива клиентов

    for (var i=0; i<newClients.length; i++) {
        if (newClients[i].id==cid) {
          var client1 = Object.assign({}, newClients);
          var newStatus = (client1[i].status=='active') ? 'blocked' : 'active';
          var client2 = u({'status': newStatus}, client1[i]);
          newClients[i] = client2;
          this.setState({clients: newClients});
          break;
        }
    }
  };

  clientDeleteProcess = (cid) => {
    console.log("clientDeleteProcess id="+cid);
    let newClients=[...this.state.clients]; // копия самого массива клиентов

    for (var i=0; i<newClients.length; i++) {
        if (newClients[i].id==cid) {
          var client1 = Object.assign({}, newClients);
          var newStatus = (client1[i].status=='active') ? 'blocked' : 'active';
          var client2 = u({'status': 'delete'}, client1[i]);
          newClients[i] = client2;
          this.setState({clients: newClients});
          break;
        }
    }
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

  updateClient = (clientId,fieldname,newvalue) => {
    let newClients=[...this.state.clients]; // копия самого массива клиентов

    for (var i=0; i<newClients.length; i++) {
        if (newClients[i].id==clientId) {
          newClients[i][fieldname] = newvalue;  
        }
    }

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
    console.log("render MobileCompany");

    var clientsWithFilter = this.state.clients.filter(x => ((x.status != 'delete') && ((x.status === this.state.filter) || (this.state.filter === 'all'))));
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
