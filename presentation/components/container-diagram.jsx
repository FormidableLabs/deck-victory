import React from "react";
import Radium from "radium";

const containerStyle = {
  background: "#ebe3db",
  border: "3px solid #b5aca3",
  width: "225px",
  height: "225px",
  margin: "0 10 10 10"
};

const labelStyle = {
  color: "#91887e",
  fontSize: 24,
};

@Radium
export default class ContainerDiagram extends React.Component {
  static propTypes = {
    label: React.PropTypes.string
  };

  static defaultProps = {
    label: "chart"
  };

  render() {
    return (
      <div>
        <h1 style={labelStyle}>{this.props.label}</h1>
        <svg style={containerStyle}/>
      </div>
    );
  }
}
