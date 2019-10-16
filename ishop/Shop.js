var Shop = React.createClass({

  displayName: 'Shop',

  propTypes: {
    shopname: React.PropTypes.string.isRequired,
    shopgoods: React.PropTypes.array.isRequired,
  },

  render: function() {

    var shopgoods=this.props.shopgoods.map( v =>
        React.DOM.div({key:v.code,className:'Goods'},
          React.DOM.span({className:'Name'},v.name),
          React.DOM.span({className:'Price'},v.price),
          React.DOM.span({className:'Fotos'},v.fotos),
          React.DOM.span({className:'Count'},v.count),
        )
      );
    return React.DOM.div( {className:'Shop'}, 
      React.DOM.div( {className:'Name'}, this.props.shopname ),
      React.DOM.div( {className:'Goods'}, shopgoods ),
    );
  },

});