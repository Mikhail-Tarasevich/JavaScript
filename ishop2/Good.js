var Good = React.createClass({

  displayName: 'Good',

  propTypes: {
    name: React.PropTypes.string,
    count: React.PropTypes.number,
    price: React.PropTypes.number,
  },

  getInitialState: function() {
    return {
      name: this.props.name,
      count: this.props.count,
      price: this.props.price,
    };
  },

  render: function() {
    var goodline  = Object.assign({}, this.state);

    return React.DOM.div( {className:'Good'}, 
      goodline.name,
    );

  },

});