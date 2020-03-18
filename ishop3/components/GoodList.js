import React from 'react';
import PropTypes from 'prop-types';

import './GoodList.css';

import Good from './Good';
import {ShopEvents} from './events';
import u from 'updeep'; 

class GoodList extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state.goods = props.goods.map( g =>
        { 
          g.url = 'http://ishop2/'+g.id; 
          g.isSelect = false;
          return g;
        }
      );
    };

    static propTypes = {
      goods: PropTypes.array,
    };

    state = {
      goods: this.props.goods,
    };

    componentDidMount = () => {
      ShopEvents.addListener('SelectGood',this.goodSelect);
      ShopEvents.addListener('DeleteGood',this.goodDelete);
    };
  
    componentWillUnmount = () => {
      ShopEvents.removeListener('SelectGood',this.goodSelect);
      ShopEvents.removeListener('DeleteGood',this.goodDelete);
    };

    goodDelete = (cid) => {
      let newGoods=[...this.state.goods]; // копия самого массива товаров

      for (var i=0; i<newGoods.length; i++) {
          if (newGoods[i].id==cid) {
            newGoods.splice(i,1);
            this.setState({goods: newGoods});
            break;
          }
      }
    };

    goodSelect = (cid) => {
      let newGoods=[...this.state.goods]; // копия самого массива товаров
  
      for (var i=0; i<newGoods.length; i++) {
          if (newGoods[i].id==cid) {
            var good1 = Object.assign({}, newGoods);
            var newStatus = !good1[i].isSelect;
            var good2 = u({'isSelect': newStatus}, good1[i]);
            newGoods[i] = good2;
            this.setState({goods: newGoods});
          }
          else if (newGoods[i].isSelect) {
            var good1 = Object.assign({}, newGoods);
            var good2 = u({'isSelect': false}, good1[i]);
            newGoods[i] = good2;
            this.setState({goods: newGoods});
          }
      }
    };
  
    render() {
      var goods=this.state.goods.map( g =>
        <Good key={g.id} name={g.name} id={g.id} count={g.count} price={g.price} url={g.url} isSelect={g.isSelect}/>
      );

      return (
        <div className='Shop'>
        <div className='ShopsHeader'>
          <table className='GoodsTableHeader'>
            <thead>
              <tr>
                <th width='610px'>Name</th>
                <th width='100px'>Price</th>
                <th width='160px'>URL</th>
                <th width='70px'>Quantity</th>
                <th width='70px'>Control</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className='Goods'>
          {goods}
        </div>
        <input type="button" value="New Product" onClick={this.clientAdd} />
      </div>
      )
    };
};

export default GoodList;