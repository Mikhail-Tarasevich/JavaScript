import React from 'react';
import PropTypes from 'prop-types';

import './GoodList.css';

import Good from './Good';
import GoodInfo from './GoodInfo';
import GoodEdit from './GoodEdit';

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
      this.state.showAddGood = false;
    };

    static propTypes = {
      goods: PropTypes.array,
      showAddGood: PropTypes.bool,
    };

    state = {
      goods: this.props.goods,
      showAddGood: this.props.showAddGood,
    };

    componentDidMount = () => {
      ShopEvents.addListener('SelectGood',this.goodSelect);
      ShopEvents.addListener('DeleteGood',this.goodDelete);
      ShopEvents.addListener('EditGood',this.goodEdit);
    };
  
    componentWillUnmount = () => {
      ShopEvents.removeListener('SelectGood',this.goodSelect);
      ShopEvents.removeListener('DeleteGood',this.goodDelete);
      ShopEvents.removeListener('EditGood',this.goodEdit);
    };

    goodAdd = () => { // добавление нового товара
      this.setState({showAddGood: true});
    }

    goodDelete = (cid) => {
      let newGoods=[...this.state.goods]; // копия самого массива товаров

      for (var i=0; i<newGoods.length; i++) {
          if (newGoods[i].id==cid) {
            newGoods.splice(i,1);
            this.setState({goods: newGoods});
            console.log("GoodList delete Good "+cid);
            break;
          }
      }
    };

    goodEdit = (cid) => {
      let newGoods=[...this.state.goods]; // копия самого массива товаров

      for (var i=0; i<newGoods.length; i++) {
        if (newGoods[i].id==cid) {
          var good1 = Object.assign({}, newGoods);
          var good2 = u({'mode': "edit", 'isSelect': true}, good1[i]);
          newGoods[i] = good2;
          this.setState({goods: newGoods});
          console.log("GoodList edit Good "+cid);
        }
        else if (newGoods[i].isSelect) {
          var good1 = Object.assign({}, newGoods);
          var good2 = u({'mode': "info", 'isSelect': false}, good1[i]);
          newGoods[i] = good2;
          this.setState({goods: newGoods});
          console.log("GoodList edit unselect Good "+i);
        }
      }
    };

    goodSelect = (cid) => {
      let newGoods=[...this.state.goods]; // копия самого массива товаров
  
      for (var i=0; i<newGoods.length; i++) {
          if (newGoods[i].id==cid && !newGoods[i].isSelect) {
            var good1 = Object.assign({}, newGoods);
            var newStatus = !good1[i].isSelect;
            var good2 = u({'isSelect': newStatus}, good1[i]);
            newGoods[i] = good2;
            this.setState({goods: newGoods});
            console.log("GoodList select Good "+cid);
          }
          else if (newGoods[i].isSelect) {
            var good1 = Object.assign({}, newGoods);
            var good2 = u({'isSelect': false}, good1[i]);
            newGoods[i] = good2;
            this.setState({goods: newGoods});
            console.log("GoodList unselect Good "+i);
          }
      }
    };
  
    render() {
      console.log("render GoodList ");

      var maxID = 0;
      this.state.goods.forEach((g) => {maxID = (maxID<Number(g.id)) ? Number(g.id) : maxID});

      var goods = this.state.goods.map( g =>
        <Good key={g.id} name={g.name} id={g.id} count={g.count} price={g.price} url={g.url} isSelect={g.isSelect}/>
      );

        var buttonNewProduct = <div className='NewProduct'><input type="button" value="New Product" onClick={this.goodAdd} /></div>
        var goodbottom = this.state.goods.filter(g => g.isSelect);
        var g = goodbottom[0];
        if (g!=undefined) {
          if (g.mode=='edit') {
            goodbottom = <GoodEdit key={g.id} name={g.name} id={g.id} count={g.count} price={g.price} url={g.url}/>
            buttonNewProduct = "";
          }
          else if (goodbottom.length>0) {
            goodbottom = <GoodInfo key={g.id} name={g.name} id={g.id} count={g.count} price={g.price} url={g.url}/>
          }
          else {
            goodbottom = "";
          }
        }

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
        <br></br>
        {buttonNewProduct}
        <div className='GoodBottom'>{goodbottom}</div>
      </div>
      )
    };
};

export default GoodList;