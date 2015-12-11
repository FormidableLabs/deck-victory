class Animation extends React.Component {
   constructor(props) {
    super(props);
    this.state = { data: this.getData(),
      style: this.getStyles()
    };
  }

  getData() {
    return _.map(_.range(25), (i) => {
      return { x: i, y: Math.random()};
    });
  }

  getStyles() {
    const color = ["red", "blue", "orange"];
    return {
      stroke: color[_.random(0, 2)],
      strokeWidth: _.random(1, 5)
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        data: this.getData(),
        style: this.getStyles()
      });
    }, 3000);
  }

  render() {
    return (
      <VictoryChart height={500}
        animate={{velocity: 0.02}}>
        <VictoryLine data={this.state.data}
          style={{data: this.state.style}}/>
      </VictoryChart>
    );
  }
}
ReactDOM.render(<Animation/>, mountNode);
