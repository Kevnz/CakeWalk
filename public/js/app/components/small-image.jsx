class SmallImage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="littleImage">
                 <a href="#"> {this.props.name} </a>
            </div>
        );
    }
}