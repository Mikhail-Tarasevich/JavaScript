import React from 'react';
import PropTypes from 'prop-types';

import "./BR2JSX.css";

class BR2JSX extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
  };
  
  render() {
    let match = [];

    this.props.text.split(/<br\s*\/*>/).forEach(function(line,index) {
      match.push(line);
      match.push(<br key={"b"+index}/>);
    });

    match.pop();

    return (
            <div>
              {match}
            </div>
    )
  }

}

export default BR2JSX;
