import React from "react";
import Radium from "radium";
import _ from "lodash";
import {VictoryLine, VictoryAxis, VictoryChart} from "victory"

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

const lineStyle = {
  data: {
    stroke: "#91887e",
    strokeWidth: 3
  }
};

const labelStyle = {
  color: "#1b2633",
  fontSize: 24,
};

@Radium
export default class LineChartDiagram extends React.Component {
  static propTypes = {
    highlightLines: React.PropTypes.bool,
    highlightAxes: React.PropTypes.bool,
    highlightColor: React.PropTypes.string,
    label: React.PropTypes.string
  };

  static defaultProps = {
    highlightColor: "#bd4139",
    highlightLines: false,
    highlightAxes: false,
    label: "chart"
  };

  getAxisStyle() {
    return this.props.highlightAxes ?
      _.merge({}, axisStyle, {axis: {stroke: this.props.highlightColor}}) :
      axisStyle;
  }

  getLineStyle() {
    return this.props.highlightLines ?
      _.merge({}, LineStyle, {data: {stroke: this.props.highlightColor}}) :
      lineStyle;
  }

  getLineData() {
    return [
      {x: 0, y: 0},
      {x: 1, y: 2},
      {x: 2, y: 1},
      {x: 3, y: 4},
      {x: 4, y: 3},
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
            <VictoryLine style={this.getLineStyle()} data={this.getLineData()}/>
            <VictoryAxis style={this.getAxisStyle()}/>
            <VictoryAxis dependentAxis style={this.getAxisStyle()}/>
          </VictoryChart>
        </svg>
      </div>
    );
  }
}
