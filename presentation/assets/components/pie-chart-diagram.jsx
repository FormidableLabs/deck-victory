import React from "react";
import Radium from "radium";
import _ from "lodash";
import {VictoryPie} from "victory-pie"

const containerStyle = {
  background: "#ebe3db",
  border: "3px solid #b5aca3",
  width: "225px",
  height: "225px",
  margin: "0 10 10 10"
};

const pieStyle = {
  data: {
    stroke: "#ebe3db",
    strokeWidth: 2
  },
  labels: {
    fill: "none"
  }
};

const pieColors = ["#4d4945", "#d1c7bc", "#b5aca3", "#91887e", "#67615c"];

const labelStyle = {
  color: "#1b2633",
  fontSize: 24,
  fontFamily: "'Karla', 'Helvetica Neue', Helvetica, Arial, sans-serif"
};

@Radium
export default class PieChartDiagram extends React.Component {
  static propTypes = {
    animate: React.PropTypes.bool,
    label: React.PropTypes.string
  };

  static defaultProps = {
    animate: false,
    label: ""
  };

  constructor(props) {
      super(props);
      this.state = {
        data: this.getData(),
        animate: null
      };
    }

  componentDidMount() {
    if (this.props.animate) {
      this.setState({animate: {velocity: 0.01}});
      setInterval(() => {
        this.setState({
          data: this.getData()
        });
      }, 2000);
    }
  }

  componentWillUnmount() {
    this.setState({animate: null});
  }

  getData() {
    return [
      { x: "A", y: 0.2 + Math.random() },
      { x: "B", y: 0.2 + Math.random() },
      { x: "C", y: 0.2 + Math.random() },
      { x: "D", y: 0.2 + Math.random() },
      { x: "E", y: 0.2 + Math.random() }
    ];
  }

  render() {
    return (
      <div>
        <h1 style={labelStyle}>{this.props.label}</h1>
        <svg style={containerStyle}>
          <VictoryPie width={225} height={225}
            padding={{
              top: 35,
              bottom: 35,
              left: 30,
              right: 35,
            }}
            innerRadius={35}
            padAngle={2}
            animate={this.state.animate}
            data={this.state.data}
            colorScale={pieColors}
            style={pieStyle}
          />
        </svg>
      </div>
    );
  }
}
