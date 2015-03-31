import React from 'react';
import List from './list.jsx';
import Viewer from './viewer.jsx';

export default class CakeWalk extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        return (
            <div className="App">
                <List images={this.props.data} ></List><Viewer />
            </div>
        );
    }
}
