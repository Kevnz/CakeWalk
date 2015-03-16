// app.js
(function() {
    'use strict';
    var React = require('react');
    var CakeWalk = require('./components/cakewalk.jsx');
    var data = window.images;
    console.log(data);
    React.render(<CakeWalk data={data} />, document.getElementById('container'));


})();