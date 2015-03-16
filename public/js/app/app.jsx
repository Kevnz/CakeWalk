// app.js
'use strict';
import React from 'react';
import CakeWalk from './components/cakewalk.jsx';
var appElement = document.getElementById('container');


var data = window.images;
console.log(data);
React.render(<CakeWalk data={data} />, document.getElementById('container'));
