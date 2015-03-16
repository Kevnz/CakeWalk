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