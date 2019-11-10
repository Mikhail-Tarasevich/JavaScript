class Good1 extends React.Component {

    displayName: 'Good';

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


    render() {
      return <div>
      <tr>
          <td>{goodline.name}</td>
          <td>{goodline.count}</td>
          <td>{goodline.price}</td>
      </tr>
    </div>;
    }
  }