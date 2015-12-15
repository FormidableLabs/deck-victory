import React from "react";
import Radium from "radium";
import _ from "lodash";


const containerStyle = {
  background: "#ebe3db",
  border: "3px solid #b5aca3",
  width: "175px",
  height: "530px",
  margin: "0 10 10 10"
};

const rectStyle = {
  stroke: "transparent",
  fill: "#b5aca3",
  height: "12px",
  width: "75px"
};

const labelStyle = {
  color: "#1b2633",
  fontSize: 24,
  fontFamily: "'Karla', 'Helvetica Neue', Helvetica, Arial, sans-serif"
};

@Radium
export default class CssDiagram extends React.Component {
  static propTypes = {
    highlights: React.PropTypes.array,
    highlightColor: React.PropTypes.string,
    label: React.PropTypes.string
  };

  static defaultProps = {
    highlightColor: "#bd4139",
    label: ".css"
  };

  renderRects() {
    let style;
    let indent;
    const rectArray = _.range(25);
    return _.map(rectArray, (index) => {
      style = _.contains(this.props.highlights, index) ?
        _.merge({}, rectStyle, {fill: this.props.highlightColor}) : rectStyle;
      return (
        <rect key={index} style={style} y={20 * index + 15} x={index % 4 * 15 + 30}/>
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
