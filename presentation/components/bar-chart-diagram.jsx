import React from "react";
import Radium from "radium";
import _ from "lodash";
import {VictoryBar, VictoryAxis, VictoryChart} from "victory"

const containerStyle = {
  background: "#ebe3db",
  border: "3px solid #b5aca3",
  width: "225px",
  height: "225px",
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
  color: "#91887e",
  fontSize: 24,
};

@Radium
export default class BarChartDiagram extends React.Component {
  static propTypes = {
    highlightBars: React.PropTypes.bool,
    highlightAxes: React.PropTypes.bool,
    highlightColor: React.PropTypes.string,
    label: React.PropTypes.string
  };

  static defaultProps = {
    highlightColor: "#bd4139",
    highlightBars: false,
    highlightAxes: false,
    label: "chart"
  };

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

  getBarData() {
    return [
      {x: 1, y: 3},
      {x: 2, y: 1},
      {x: 3, y: 2},
      {x: 4, y: 4},
      {x: 5, y: 5}
    ];
  }

  render() {
    return (
      <div>
        <h1 style={labelStyle}>{this.props.label}</h1>
        <svg style={containerStyle}>
          <VictoryChart width={225} height={225} padding={35}
            standalone={false} domain={{x: [0, 5.8], y: [0, 5]}}
          >
            <VictoryBar style={this.getBarStyle()} data={this.getBarData()}/>
            <VictoryAxis style={this.getAxisStyle()}/>
            <VictoryAxis dependentAxis style={this.getAxisStyle()}/>
          </VictoryChart>
        </svg>
      </div>
    );
  }
}
