// app.js
(function() {
    'use strict';
    var data = window.images;
    console.log(data);
    React.render(<CakeWalk data={data} />, document.getElementById('container'));


})();