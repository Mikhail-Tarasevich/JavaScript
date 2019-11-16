var Good = React.createClass({

  displayName: 'Good',

  propTypes: {
    cdDelete: React.PropTypes.func,
    cdSelect: React.PropTypes.func,
    isSelect: React.PropTypes.bool,
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
      cdDelete: this.props.cdDelete,
      cdSelect: this.props.cdSelect,
      isSelect: this.props.isSelect,
      id: this.props.id,
      url: this.props.url,
      name: this.props.name,
      count: this.props.count,
      price: this.props.price,
    };
  },

  actionDelete: function(event) {
    this.state.cdDelete(this.props.id);
    event.stopPropagation();
  },

  trOnClick: function() {
    this.state.cdSelect(this.props.id);
  },

  render: function() {
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
  },

});