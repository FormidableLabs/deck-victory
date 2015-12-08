import React from "react";
import Radium from "radium";
import _ from "lodash";
import {VictoryBar, VictoryAxis, VictoryChart} from "victory"

const containerStyle = {
  background: "#ebe3db",
  border: "3px solid #b5aca3",
  width: "14em",
  height: "14em",
  margin: "0 10 10 10"
};

const axisStyle = {
  axis: {
    stroke: "#91887e",
    strokeWidth: 6,
    strokeLinecap: "square"
  },
  ticks: {stroke: "transparent"},
  tickLabels: {fill: "none"}
};

const barStyle = {
  data: {
    fill: "#b5aca3",
    width: 12
  }
};

const labelStyle = {
  color: "#1b2633",
  fontSize: 24,
};

@Radium
export default class BarChartDiagram extends React.Component {
  static propTypes = {
    highlightBars: React.PropTypes.bool,
    highlightAxes: React.PropTypes.bool,
    highlightColor: React.PropTypes.string,
    animate: React.PropTypes.bool,
    label: React.PropTypes.string
  };

  static defaultProps = {
    highlightColor: "#bd4139",
    highlightBars: false,
    highlightAxes: false,
    animate: false,
    label: ""
  };

  constructor(props) {
      super(props);
      this.state = {
        data: this.getData(),
      };
    }

    componentDidMount() {
      if (this.props.animate) {
        setInterval(() => {
          this.setState({
            data: this.getData(),
          });
        }, 2000);
      }
    }

    getData() {
      return [
        {x: 1, y: _.random(1, 5)},
        {x: 2, y: _.random(1, 5)},
        {x: 3, y: _.random(1, 5)},
        {x: 4, y: _.random(1, 5)},
        {x: 5, y: _.random(1, 5)}
      ];
    }

  getAxisStyle() {
    return this.props.highlightAxes ?
      _.merge({}, axisStyle, {axis: {stroke: this.props.highlightColor}}) :
      axisStyle;
  }

  getBarStyle() {
    return this.props.highlightBars ?
      _.merge({}, barStyle, {data: {fill: this.props.highlightColor}}) :
      barStyle;
  }

  render() {
    return (
      <div>
        <h1 style={labelStyle}>{this.props.label}</h1>
        <svg style={containerStyle}>
          <VictoryChart width={225} height={225} padding={35}
            standalone={false} domain={{x: [0, 5.8], y: [0, 5]}}
          >
            <VictoryBar animate={{velocity: 0.01}} style={this.getBarStyle()} data={this.state.data}/>
            <VictoryAxis style={this.getAxisStyle()}/>
            <VictoryAxis dependentAxis style={this.getAxisStyle()}/>
          </VictoryChart>
        </svg>
      </div>
    );
  }
}
