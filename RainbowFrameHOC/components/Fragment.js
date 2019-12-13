import React from 'react';

import './Fragment.css';

class Fragment extends React.Component {

  render() {
    return <div>{this.props.children}</div>
  }

}

export default Fragment;
