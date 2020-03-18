"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import GoodList from './components/GoodList';

var goods=require('./components/GoodList.json');

ReactDOM.render(
  <GoodList
  goods = {goods.GoodList}
  />
  , document.getElementById('container') 
);

