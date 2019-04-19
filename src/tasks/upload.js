var cloudinary = require('cloudinary')
var config = require('xtconf')()
const fs = require('fs').promises
const path = require('path')

cloudinary.config({
  cloud_name: config.get('cloudinary-name'),
  api_key: config.get('cloudinary-key'),
  api_secret: config.get('cloudinary-secret'),
})

fs.readdir('./gallery', function(err, files) {
  for (var i = 0; i < files.length; i++) {
    console.log(files[i])
    cloudinary.uploader.upload(
      './gallery/' + files[i],
      function(result) {
        console.log(result)
      },
      { public_id: files[i] }
    )
  }
})

module.exports = async () => {
  const files = await fs.readdir(path.join(process.cwd(), ('./gallery'))

}
