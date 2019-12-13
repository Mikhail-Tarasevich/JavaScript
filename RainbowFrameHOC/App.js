"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import Fragment from './components/Fragment';
import { withRainbowFrame } from './components/withRainbowFrame';
import "./App.css";

let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
let FramedFragment=withRainbowFrame(colors)(Fragment);

ReactDOM.render(
    <FramedFragment>
      Hello!
    </FramedFragment>
  , document.getElementById('container') 
);

