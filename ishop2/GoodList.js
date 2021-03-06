var GoodList = React.createClass({

    displayName: 'GoodList',

    propTypes: {
        goodsReact: React.PropTypes.arrayOf(React.PropTypes.element),
        goods: React.PropTypes.array,
    },
  
    getInitialState: function() {
        var elements = this.props.goods.map( v =>
          React.createElement(Good, {key:v.id, id:v.id,
            name:v.name, count:v.count, price:v.price, url: 'http://ishop2/'+v.id, cdDelete: this.deleteGood, cdSelect: this.selectGood, isSelect: false,
          })
        );

        return {
          goodsReact: elements,
        };
    }, 

    deleteGood: function(id) {
      if (confirm("Удалить товар?")) {
        var newGoodsList = this.state.goodsReact.filter(good => good.props.id != id);
        this.setState( (prevState, props) => { 
          return {goodsReact: newGoodsList}; 
        }         );
      }
      else {
        return;
      }
    },

    selectGood: function(id) {
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
    },

    render: function() {
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
    },
});