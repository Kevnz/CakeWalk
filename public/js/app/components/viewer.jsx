var React = require('react');
class Viewer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="imgViewer">
                <img className="mainImg" />
            </div>
        );
    }
}
module.exports = Viewer;