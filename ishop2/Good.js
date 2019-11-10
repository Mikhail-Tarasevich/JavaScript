var Good = React.createClass({

  displayName: 'Good',

  propTypes: {
    url: React.PropTypes.string,
    name: React.PropTypes.string,
    count: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    price: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
  },

  getInitialState: function() {
    return {
      id: this.props.id,
      url: this.props.url,
      name: this.props.name,
      count: this.props.count,
      price: this.props.price,
    };
  },

  actionDelete: function() {
    console.log('actionDelete: ' + this.props.id);
  },

  render: function() {
    var goodline  = Object.assign({}, this.state);

    return  React.DOM.table({className: "GoodLine"}, 
      React.DOM.thead(null, 
        React.DOM.tr(null,
          React.DOM.td({className: "tdName"}, goodline.name), 
          React.DOM.td({className: "tdPrice"}, goodline.price), 
          React.DOM.td({className: "tdURL"}, goodline.url), 
          React.DOM.td({className: "tdCount"}, goodline.count), 
          React.DOM.td({className: "tdControl"}, React.DOM.input({type:'button',value:'Delete',onClick:this.actionDelete}))
        ),
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