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

    return(
<div>{this.props.name}</div>
    );
  };

};

export default Good;