﻿"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import MobileCompany from './components/MobileCompany';

let companyName='Velcom';
let clientsArr=[ 
  {id:101, name_f:"Иванов", name_n: "Иван", name_o: "Иванович", status: "active", balance:200}, 
  {id:105, name_f:"Сидоров", name_n: "Сидор", name_o: "Сидорович", status: "active", balance:250}, 
  {id:110, name_f:"Петров", name_n: "Петр", name_o: "Петрович", status: "active", balance:180},
  {id:120, name_f:"Григорьев", name_n: "Григорий", name_o: "Григорьевич", status: "blocked", balance:220},
];

ReactDOM.render(
  <MobileCompany 
    name={companyName}
    clients={clientsArr}
  />
  , document.getElementById('container') 
);

