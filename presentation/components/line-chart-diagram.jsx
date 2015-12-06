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

const lineStyle = {
  stroke: "transparent",
  stroke: "#b5aca3",
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
export default class LineChartDiagram extends React.Component {
  static propTypes = {
    highlightLine: React.PropTypes.bool,
    highlightAxes: React.PropTypes.bool,
    highlightColor: React.PropTypes.string,
    label: React.PropTypes.string
  };

  static defaultProps = {
    highlightColor: "#bd4139",
    highlightLine: false,
    highlightAxes: false,
    label: "chart"
  };

  getLinePath(x0, y0) {
    return `M ${x0}, ${y0}
      L ${x0}, ${y0}
      L ${x0}, ${y0}
      L ${x0}, ${y0}
      L ${x0}, ${y0}`;
  }

  renderLine() {
    const overrides = {
      stroke: this.props.highlightLine ? this.props.highlightColor : undefined,
    };
    return (
      <path
        key={index}
        d={this.getLinePath(1.5, 11)}
        style={_.merge({}, LineStyle, overrides)}
      />
    );
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
          {this.renderLine()}
          {this.renderAxes()}
        </svg>
      </div>
    );
  }
}
