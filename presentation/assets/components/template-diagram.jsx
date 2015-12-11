import React from "react";
import Radium from "radium";
import _ from "lodash";


const containerStyle = {
  background: "#ebe3db",
  border: "3px solid #b5aca3",
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
  color: "#1b2633",
  fontSize: 24,
  fontFamily: "sans-serif"
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
    const rectArray = _.range(5);
    const nesting = rectArray.length / 2;
    return _.map(rectArray, (index) => {
      style = _.contains(this.props.highlights, index) ?
        _.merge({}, rectStyle, {fill: this.props.highlightColor}) : rectStyle;
      // indent = ((index + 1) % 3 === 0 || (index + 1) % 3 === 1) ? 30 : 45;
      indent = (index < nesting) ?
        index * 15 + 30 :
        (rectArray.length - index) * 15 + 15;
      return (
        <rect key={index} style={style} y={20 * index + 15} x={indent}/>
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
