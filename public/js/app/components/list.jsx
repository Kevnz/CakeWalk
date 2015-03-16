var SmallImage = require('./small-image.jsx');
var React = require('react');
class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.images);
        var imageNodes = this.props.images.map(function (imageInfo) {
            console.log(imageInfo)
             return(<SmallImage name={imageInfo.name} thumb={imageInfo.thumb} full={imageInfo.full}></SmallImage>);
        });
        return (
            <ul className="cw-imgList">
               {imageNodes}
            </ul>
        );
    }
}

module.exports = List;