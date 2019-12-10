"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import RainbowFrame from './components/RainbowFrame';

// let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
// <ColorFrame color="red">
// array1.forEach(element => console.log(element));
let colors = 'red';

ReactDOM.render(
    <RainbowFrame color={colors}>
      Hello!
    </RainbowFrame>
  , document.getElementById('container') 
);

