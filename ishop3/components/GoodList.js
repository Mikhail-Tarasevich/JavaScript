import React from 'react';
import PropTypes from 'prop-types';

import './GoodList.css';

import Good from './Good';

class GoodList extends React.Component {
    static propTypes = {
        goodsReact: PropTypes.arrayOf(PropTypes.element),
        goods: PropTypes.array,
    };
  
    state = {
      goodsReact: = this.props.goods.map( v =>
          React.createElement(Good, {key:v.id, id:v.id,
            name:v.name, count:v.count, price:v.price, url: 'http://ishop2/'+v.id, cdDelete: this.deleteGood, cdSelect: this.selectGood, isSelect: false,
          })
        )
    };

    deleteGood(id) {
      if (confirm("Удалить товар?")) {
        var newGoodsList = this.state.goodsReact.filter(good => good.props.id != id);
        this.setState( (prevState, props) => { 
          return {goodsReact: newGoodsList}; 
        }         );
      }
      else {
        return;
      }
    };

    selectGood(id) {
      var newGoodsList = this.state.goodsReact.map(function(v) {
        var newIsSelect = (v.props.id==id);
        var obj = React.createElement(Good, {key:v.props.id, id:v.props.id,
          name:v.props.name, count:v.props.count, price:v.props.price, url: 'http://ishop2/'+v.props.id, cdDelete: this.deleteGood, cdSelect: this.selectGood, isSelect: newIsSelect,
        });

        return obj;
      }, this);

      this.setState( (prevState, props) => { 
        return {goodsReact: newGoodsList}; 
      }         );
    };

    render() {
        var renderGoods = this.state.goodsReact;

        return  React.DOM.div(null, 
            React.DOM.table({className: "GoodHeader"}, 
              React.DOM.thead(null, 
                React.DOM.tr({style: { backgroundColor: 'gray'}},
                  React.DOM.td({className: "tdName"}, 'Name'), 
                  React.DOM.td({className: "tdPrice"}, 'Price'), 
                  React.DOM.td({className: "tdURL"}, 'URL'), 
                  React.DOM.td({className: "tdCount"}, 'Quantity'), 
                  React.DOM.td({className: "tdControl"}, 'Control'),
                ),
              ),
            ),

            React.DOM.div({className:'goods23'}, renderGoods),);
    };
};

export default GoodList;