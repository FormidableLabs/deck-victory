import React from "react";
import Radium from "radium";
import _ from "lodash";


const containerStyle = {
  background: "#ebe3db",
  border: "3px solid #ccc",
  width: "11em",
  height: "13em",
  margin: "0.1em 1em 1em 1em"
};

const rectStyle = {
  stroke: "transparent",
  fill: "#b5aca3",
  height: "0.75em",
  width: "6em"
};

const labelStyle = {
  color: "#91887e",
  fontSize: 24,
};


@Radium
export default class TemplateDiagram extends React.Component {
  static propTypes = {
    highlights: React.PropTypes.array,
    highlightColor: React.PropTypes.string,
    label: React.PropTypes.string
  };

  static defaultProps = {
    highlightColor: "#bd4139",
    label: ".html"
  };

  renderRects() {
    let style;
    let indent;
    const rectArray = _.range(3);
    return _.map(rectArray, (index) => {
      style = _.contains(this.props.highlights, index) ?
        _.merge({}, rectStyle, {fill: this.props.highlightColor}) : rectStyle;
      indent = (index % 2 === 0) ? "2em" : "3em";
      return (
        <rect key={index} style={style} y={`${1.25 * index + 1}em`} x={indent}/>
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
