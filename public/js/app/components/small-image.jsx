class SmallImage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <span className="littleImage">
            	<img src={this.props.thumb} />
                <a href="#"> {this.props.name} </a>
            </span>
        );
    }
}