"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import ImmutableTest from './components/ImmutableTest';

var sh = {'0': 0, '1': 1};

ReactDOM.render(
  <ImmutableTest
    id={Math.random()}
    editmode={false}
    arr={sh}
  />
  , document.getElementById('container') 
);

