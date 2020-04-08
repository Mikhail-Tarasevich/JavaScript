import React from 'react';
import PropTypes from 'prop-types';

import './GoodEdit.css';
import u from 'updeep'; 

class GoodEdit extends React.PureComponent {
    static propTypes = {
      url: PropTypes.string,
      name: PropTypes.string,
      count: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      price: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
    };
    
    state = {
      id: this.props.id,
      url: this.props.url,
      name: this.props.name,
      count: this.props.count,
      price: this.props.price,
      errors: {name: "", count: "", price: "", url: ""},
    };

    // обработчик изменений name --- Начало кода
    name_Ref = null;

    getName = (ref) => {
      this.name_Ref=ref;
    };

    onChangeName = () => {
      var errorName = this.name_Ref.value=='' ? "Не указано наименование товара" : "";
      if (this.state.errors.name!=errorName) {
        var errors1 = Object.assign({}, this.state.errors);
        var errors2 = u({'name': errorName}, errors1);
        this.setState({errors: errors2});
      }
    }
    // обработчик изменений name --- Конец кода

    // обработчик изменений price --- Начало кода
    price_Ref = null;

    getPrice = (ref) => {
      this.price_Ref=ref;
    };

    onChangePrice = () => {
      var errorprice = this.price_Ref.value=='' ? "Не указана цена товара" : "";
      if (this.state.errors.price!=errorprice) {
        var errors1 = Object.assign({}, this.state.errors);
        var errors2 = u({'price': errorprice}, errors1);
        this.setState({errors: errors2});
      }
    }
    // обработчик изменений price --- Конец кода

    // обработчик изменений url --- Начало кода
    url_Ref = null;

    getUrl = (ref) => {
      this.url_Ref=ref;
    };

    onChangeUrl = () => {
      var errorurl = this.url_Ref.value=='' ? "Не указана ссылка на товар" : "";
      if (this.state.errors.url!=errorurl) {
        var errors1 = Object.assign({}, this.state.errors);
        var errors2 = u({'url': errorurl}, errors1);
        this.setState({errors: errors2});
      }
    }
    // обработчик изменений url --- Конец кода

    // обработчик изменений count --- Начало кода
    count_Ref = null;

    getCount = (ref) => {
      this.count_Ref=ref;
    };

    onChangeCount = () => {
      var errorcount = this.count_Ref.value=='' ? "Не указано количество товара" : "";
      if (this.state.errors.count!=errorcount) {
        var errors1 = Object.assign({}, this.state.errors);
        var errors2 = u({'count': errorcount}, errors1);
        this.setState({errors: errors2});
      }
    }
    // обработчик изменений count --- Конец кода

    render() {
        console.log("render GoodEdit "+this.props.id);

        var saveMode = !(this.state.errors.count=="" && this.state.errors.price=="" && this.state.errors.url=="" && this.state.errors.count=="")
        var b1 = <input type="button" value="Save" onClick={this.actionSave} disabled={saveMode}/>;
        var b2 = <input type="button" value="Cancel" onClick={this.actionCancel}/>;
        var b3 = <input type="button" value="Add" onClick={this.actionAdd}/>;
        var buttons = (this.state.mode=='new') ? <div>{b3} {b2}</div> : <div>{b1} {b2}</div>;
    
        return(
          <div className='GoodEdit'>
            <p><b>Edit existing product</b></p>

            <table className='GoodTable'>
              <thead>
                <tr><td>ID:</td><td><div>{this.state.id}</div></td></tr>
                <tr><td>Name:</td><td><div><input className='cellText' size='85' type="text" defaultValue={this.state.name} ref={this.getName} onChange={this.onChangeName}/></div></td><td><span className='errorText'>{this.state.errors.name}</span></td></tr>
                <tr><td>Price:</td><td><div><input className='cellText' size='5' type="text" defaultValue={this.state.price} ref={this.getPrice} onChange={this.onChangePrice}/></div></td><td><span className='errorText'>{this.state.errors.price}</span></td></tr>
                <tr><td>URL:</td><td><div><input className='cellText' size='20' type="text" defaultValue={this.state.url} ref={this.getUrl} onChange={this.onChangeUrl}/></div></td><td><span className='errorText'>{this.state.errors.url}</span></td></tr>
                <tr><td>Quantity:</td><td><div><input className='cellText' size='5' type="text" defaultValue={this.state.count} ref={this.getCount} onChange={this.onChangeCount}/></div></td><td><span className='errorText'>{this.state.errors.count}</span></td></tr>
                <tr><td></td><td className='GoodEditButtons' width='100px'>{buttons}</td></tr>
              </thead>
            </table>
          </div>
        );
    };

};

export default GoodEdit;