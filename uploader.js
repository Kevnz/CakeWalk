var cloudinary = require('cloudinary');
var config = require("xtconf")(); 
var fs = require('fs');

cloudinary.config({ 
  cloud_name: config.get('cloudinary-name'), 
  api_key: config.get('cloudinary-key'), 
  api_secret: config.get('cloudinary-secret')
});


fs.readdir('./gallery', function (err, files) {
	for (var i = 0; i < files.length; i++) {
		console.log(files[i]);
		cloudinary.uploader.upload('./gallery/' + files[i], function(result) { 
		  console.log(result) 
		}, { public_id:  files[i] });
	};
});