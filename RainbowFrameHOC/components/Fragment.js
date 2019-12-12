import React from 'react';
import PropTypes from 'prop-types';

import './Fragment.css';

class Fragment extends React.Component {

  static propTypes = {
    text: PropTypes.string,
  };

  render() {
    return <div>Привет!</div>;
  }

}

export default Fragment;
