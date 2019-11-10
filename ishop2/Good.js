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

    return  React.DOM.table({className: "MyClassName"}, 
      React.DOM.thead(null, 
        React.DOM.tr(null, React.DOM.td({className: "td1"}, goodline.name), React.DOM.td({className: "td2"}, goodline.count), React.DOM.td({className: "td3"}, goodline.price)),
      )
    );
    
      /*    
    React.DOM.div( {className:'Good1'},
        React.DOM.span({className:'Name'},goodline.name),
        React.DOM.span({className:'Count'},goodline.count),
        React.DOM.span({className:'Price'},goodline.price),
      );

      <div>
        <tr>
            <td>{goodline.name}</td>
            <td>{goodline.count}</td>
            <td>{goodline.price}</td>
        </tr>
      </div>
      */

  },

});