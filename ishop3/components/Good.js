import React from 'react';
import PropTypes from 'prop-types';

import './GoodList.css';

class Good extends React.Component {

  static propTypes = {
    cdDelete: PropTypes.func,
    cdSelect: PropTypes.func,
    isSelect: PropTypes.bool,
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
      cdDelete: this.props.cdDelete,
      cdSelect: this.props.cdSelect,
      isSelect: this.props.isSelect,
      id: this.props.id,
      url: this.props.url,
      name: this.props.name,
      count: this.props.count,
      price: this.props.price,
  };

  actionDelete(event) {
    this.state.cdDelete(this.props.id);
    event.stopPropagation();
  };

  trOnClick() {
    this.state.cdSelect(this.props.id);
  };

  render() {
    var goodline  = Object.assign({}, this.state);
    var style = this.props.isSelect ? { backgroundColor: 'red'} : { backgroundColor: 'cyan'};

    return  React.DOM.table({className: "GoodLine"}, 
      React.DOM.thead(null, 
        React.DOM.tr({onClick:this.trOnClick, style: style}, 
          React.DOM.td({className: "tdName"}, goodline.name), 
          React.DOM.td({className: "tdPrice"}, goodline.price), 
          React.DOM.td({className: "tdURL"}, goodline.url), 
          React.DOM.td({className: "tdCount"}, goodline.count), 
          React.DOM.td({className: "tdControl"}, React.DOM.input({type:'button',value:'Delete',onClick:this.actionDelete}))
        ),
      )
    );
  };

};

export default Good;