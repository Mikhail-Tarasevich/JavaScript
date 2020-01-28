import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Immutable from 'immutable';

class ImmutableTest extends React.PureComponent {

  static propTypes = {
    id: PropTypes.number.isRequired,
    editmode: PropTypes.bool.isRequired,
    arr: PropTypes.array,
  };

  state = {
    editmode: this.props.editmode,
    arr: this.props.arr,
  };

  onChange = () => {
    var imArr1 = Immutable.Map(Object.assign({}, this.state.arr));
    var imArr2 = imArr1.set('0', 555);
    var imList = imArr2.toList();
    var imArr = imList.toArray();
    this.setState({arr: imArr2.toList().toArray()})
  };

  onClick = () => {
    this.setState({editmode: !this.state.editmode})
  };

  render() {
/*
    var client1 = Immutable.Map(Object.assign({}, this.state));
    var newstatus = (client1.get('info').status=='active') ? 'blocked' : 'active';
    var newinfo = client1.get('info');
    newinfo.status = newstatus;
    var client2 = client1.set('info', newinfo);
*/
    
    var em = (this.state.editmode) ? "Редактировать" : "Не редактировать";

    return (
      <div>
        <p>{this.state.arr}</p>
        <p><input type="button" value={em} onClick={this.onClick}/></p>
        <p><input type="text" disabled={this.state.editmode} onChange={this.onChange} defaultValue={3}/></p>
      </div>
    );
  }
};

export default ImmutableTest;
