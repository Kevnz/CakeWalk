exports.index = function(req, res){


    var fs = require('fs');
    var path = require('path');
    var images = [];
    var galleryPath = path.join(__dirname, '../public/img/gallery');
    var httpPath = '/img/gallery/';
    fs.readdir(galleryPath, function (err, files) {
        for (var i = 0; i < files.length; i++) {
            if(files[i].toLowerCase().indexOf('thumb') === -1){
                images.push({path: httpPath+files[i]});
            }
        }
        res.render('index', { title: 'CakeWalk App', images: images });
    });
  
};
