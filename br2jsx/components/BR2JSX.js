import React from 'react';
import PropTypes from 'prop-types';

class BR2JSX extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
  };
  
  render() {
    let match = [];
    let i = 0;

    this.props.text.split(/<br\s*\/*>/).forEach(function(line) {
      i++;
      match.push(<span key={i.toString()}>{line}</span>);
      match.push(<br/>);
    });

    return (
            <div>
              {match}
            </div>
    )
  }

}

export default BR2JSX;
