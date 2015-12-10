import React from "react";
import Radium from "radium";
import _ from "lodash";
import {VictoryChart} from "victory-chart";
import {VictoryAxis} from "victory-axis";
import {VictoryLine} from "victory-line";

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
    animate: React.PropTypes.bool,
    label: React.PropTypes.string
  };

  static defaultProps = {
    highlightColor: "#bd4139",
    highlightLines: false,
    highlightAxes: false,
    animate: false,
    label: ""
  };

  constructor(props) {
      super(props);
      this.state = {
        data: [
          {x: 0, y: 0},
          {x: 1, y: 1},
          {x: 2, y: 3},
          {x: 3, y: 1},
          {x: 4, y: 4},
          {x: 5, y: 3},
          {x: 6, y: 2},
          {x: 7, y: 5}
        ]
      };
    }

    componentDidMount() {
      if (this.props.animate) {
        setInterval(() => {
          this.setState({
            data: this.getData()
          });
        }, 2000);
      }
    }

    getData() {
      return [
        {x: 0, y: 0},
        {x: 1, y: _.random(1, 3)},
        {x: 2, y: _.random(3, 5)},
        {x: 3, y: _.random(1, 5)},
        {x: 4, y: _.random(1, 3)},
        {x: 5, y: _.random(3, 5)},
        {x: 6, y: _.random(1, 5)},
        {x: 7, y: _.random(3, 5)}
      ];
    }

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

  render() {
    return (
      <div>
        <h1 style={labelStyle}>{this.props.label}</h1>
        <svg style={containerStyle}>
          <VictoryChart width={225} height={225} padding={35}
            standalone={false} domain={{x: [0, 7], y: [0, 5]}}
          >
            <VictoryLine
              animate={{velocity: 0.01}}
              style={this.getLineStyle()}
              data={this.state.data}
              interpolation="basis"
            />
            <VictoryAxis style={this.getAxisStyle()}/>
            <VictoryAxis dependentAxis style={this.getAxisStyle()}/>
          </VictoryChart>
        </svg>
      </div>
    );
  }
}
