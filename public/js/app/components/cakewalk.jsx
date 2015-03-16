var React = require('react');
var List = require('./list.jsx');
var Viewer = require('./viewer.jsx');
class CakeWalk extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        return (
            <div className="app">
                <List images={this.props.data} ></List><Viewer />
            </div>
        );
    }
}
module.exports = CakeWalk;