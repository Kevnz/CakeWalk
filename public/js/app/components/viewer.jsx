import React from 'react';
export default class Viewer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="Viewer">
                <img className="Viewer-img" />
            </div>
        );
    }
}