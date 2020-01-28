"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import ImmutableTest from './components/ImmutableTest';

import Immutable from 'immutable';

ReactDOM.render(
  <ImmutableTest
    id={Math.random()}
    editmode={false}
    arr={[1,2,3]}
  />
  , document.getElementById('container') 
);

