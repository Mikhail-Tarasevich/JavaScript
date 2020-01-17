import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './MobileClient.css';

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

  clientDelete = () => {
    console.log("clientDelete id="+this.state.info.id);
  };

  clientEdit = () => {
    console.log("clientEdit id="+this.state.info.id);
  };

  componentWillReceiveProps = (newProps) => {
    console.log("MobileClient id="+this.props.info.id+" componentWillReceiveProps");
    this.setState({info:newProps.info});
  };

  render() {

    console.log("MobileClient id="+this.state.info.id+" render");

    var clients  = Object.assign({}, this.state);
    var clientStatusBGColor = (clients.info.status=="active") ? 'green' : 'red';

    return (
      <div className='MobileClient'>
        <table className='MobileClientTable'>
          <thead>
            <tr>
              <td className='MobileClientF' align='left' width='100px'>{clients.info.name_f}</td>
              <td className='MobileClientN' align='left' width='100px'>{clients.info.name_n}</td>
              <td className='MobileClientO' align='left' width='100px'>{clients.info.name_o}</td>
              <td className='MobileClientStatus' align='center' width='70px' bgcolor={clientStatusBGColor}>{clients.info.status}</td>
              <td className='MobileClientBalance' align='center' width='70px'>{clients.info.balance}</td>
              <td className='MobileClientEdit' align='center' width='100px'><input type="button" value="Редактировать" onClick={this.clientEdit}/></td>
              <td className='MobileClientDelete' align='center' width='100px'><input type="button" value="Удалить" onClick={this.clientDelete}/></td>
            </tr>
          </thead>
        </table>
      </div>
    );

    /*
    return ReactDOM.table({className: "MobileClient"}, 
ReactDOM.thead(null, 
  ReactDOM.tr({onClick:this.trOnClick, style: style}, 
    ReactDOM.td({className: "MobileClientBalance"}, clients.info.balance), 
    ReactDOM.td({className: "MobileClientF"}, clients.info.name_f), 
    ReactDOM.td({className: "MobileClientN"}, clients.info.name_n), 
    ReactDOM.td({className: "MobileClientO"}, clients.info.name_o), 
    ReactDOM.td({className: "MobileClientStatus"}, clients.info.status), 
  ),
)
);
    
    
    return (
      <div className='MobileClient'>
        <span className='MobileClientBalance'>{this.state.info.balance}</span>
        <span className='MobileClientF'>{this.state.info.name_f}</span>
        <span className='MobileClientI'>{this.state.info.name_n}</span>
        <span className='MobileClientO'>{this.state.info.name_o}</span>
        <span className='MobileClientStatus'>{this.state.info.status}</span>
      </div>
    );
    */

/*
return ReactDOM.table({className: "MobileClient"}, 
ReactDOM.thead(null, 
  ReactDOM.tr({onClick:this.trOnClick, style: style}, 
    ReactDOM.td({className: "MobileClientBalance"}, clients.info.balance), 
    ReactDOM.td({className: "MobileClientF"}, clients.info.name_f), 
    ReactDOM.td({className: "MobileClientN"}, clients.info.name_n), 
    ReactDOM.td({className: "MobileClientO"}, clients.info.name_o), 
    ReactDOM.td({className: "MobileClientStatus"}, clients.info.status), 
  ),
)
);
*/

  }

}

export default MobileClient;
