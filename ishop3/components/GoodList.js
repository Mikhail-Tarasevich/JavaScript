import React from 'react';
import PropTypes from 'prop-types';

import './GoodList.css';

import Good from './Good';

class GoodList extends React.Component {
    static propTypes = {
        goods: PropTypes.array,
    };
  
    render() {
      var goods=this.props.goods.map( g =>
        <Good key={g.id} name={g.name}/>
      );

      return (
        <div>{goods}</div>
      )
    };
};

export default GoodList;