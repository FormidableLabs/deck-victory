import React from "react";
import Radium from "radium";
import _ from "lodash";


const containerStyle = {
  background: "#ebe3db",
  border: "3px solid #ccc",
  width: "175px",
  height: "225px",
  margin: "0 10 10 10"
};

const rectStyle = {
  stroke: "transparent",
  fill: "#b5aca3",
  height: "12px",
  width: "85px"
};

const labelStyle = {
  color: "#91887e",
  fontSize: 24,
};

@Radium
export default class JsDiagram extends React.Component {
  static propTypes = {
    highlights: React.PropTypes.array,
    highlightColor: React.PropTypes.string,
    label: React.PropTypes.string
  };

  static defaultProps = {
    highlightColor: "#bd4139",
    label: ".js"
  };

  renderRects() {
    let style;
    let indent;
    let spacing;
    const rectArray = _.range(8);
    return _.map(rectArray, (index) => {
      style = _.contains(this.props.highlights, index) ?
        _.merge({}, rectStyle, {fill: this.props.highlightColor}) : rectStyle;
      indent = ((index + 1) % 4 === 0 || (index + 1) % 4 === 1) ? "2em" : "3em";
      spacing = 1.25 * index + Math.floor(index / 4);
      return (
        <rect key={index} style={style} y={`${spacing + 1}em`} x={indent}/>
      );
    });
  }

  render() {
    return (
        <div>
          <h1 style={labelStyle}>{this.props.label}</h1>
          <svg style={containerStyle}>
            {this.renderRects()}
          </svg>
        </div>
    );
  }
}
