import React from "react";
import Radium from "radium";
import _ from "lodash";

const containerStyle = {
  background: "#ebe3db",
  border: "3px solid #ccc",
  width: "13em",
  height: "13em",
  margin: "0.1em 1em 1em 1em"
};

const barStyle = {
  stroke: "transparent",
  fill: "#b5aca3",
};

const axisStyle = {
  stroke: "#91887e",
  strokeWidth: "0.3"
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

  getBarPath(x, y0, y1) {
    const size = 0.6;
    return `M ${x - size}, ${y0}
      L ${x - size}, ${y1}
      L ${x + size}, ${y1}
      L ${x + size}, ${y0}
      L ${x - size}, ${y0}`;
  }

  renderBars() {
    let overrides;
    let x;
    let y1;
    const y0 = 11;
    const barArray = _.range(5);
    return _.map(barArray, (index) => {
      overrides = {
        fill: this.props.highlightBars ? this.props.highlightColor : undefined,
      };
      y1 = _.random(4, 9);
      x = 1.75 * index + 3;
      return (
        <path
          key={index}
          d={this.getBarPath(x, y0, y1)}
          style={_.merge({}, barStyle, overrides)}
        />
      );
    });
  }

  renderAxes() {
    return (
      <g>
        <line key={"x"} style={axisStyle} x1={"1.5"} y1={"11"} x2={"11.5"} y2={"11"}/>
        <line key={"y"} style={axisStyle} x1={"1.65"} y1={"11"} x2={"1.65"} y2={"1.5"}/>
      </g>
    )
  }

  render() {
    return (
      <div>
        <h1 style={labelStyle}>{this.props.label}</h1>
        <svg style={containerStyle} viewBox="0 0 13 13">
          {this.renderBars()}
          {this.renderAxes()}
        </svg>
      </div>
    );
  }
}
