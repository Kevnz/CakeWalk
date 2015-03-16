var cloudinary = require('cloudinary');
var config = require("xtconf")(); 
var fs = require('fs');

cloudinary.config({ 
  cloud_name: config.get('cloudinary-name'), 
  api_key: config.get('cloudinary-key'), 
  api_secret: config.get('cloudinary-secret')
});


//console.log(cloudinary.url("bob.jpg", { width: 125, height: 155, crop:'fit'}));
var imageUrls = [];

var files = fs.readdirSync('./gallery');
for (var i = 0; i < files.length; i++) {
	imageUrls.push({
		thumb: cloudinary.url(files[i], { width: 125, height: 155, crop:'fit'})+'.jpg',
		full: cloudinary.url(files[i])+'.jpg',
		name:files[i]
	});
};

module.exports = imageUrls;