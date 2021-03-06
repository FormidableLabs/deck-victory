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
  color: "#1b2633",
  fontSize: 24,
  fontFamily: "'Karla', 'Helvetica Neue', Helvetica, Arial, sans-serif"
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
        <svg style={containerStyle}>
          <text x="45" y="50" fill="#bd4139" fontFamily="'Karla', 'Helvetica Neue', Helvetica, Arial, sans-serif" fontSize="50" fontWeight="bold">NOPE</text>
          <text x="45" y="100" fill="#bd4139" fontFamily="'Karla', 'Helvetica Neue', Helvetica, Arial, sans-serif" fontSize="50" fontWeight="bold">NOPE</text>
          <text x="45" y="150" fill="#bd4139" fontFamily="'Karla', 'Helvetica Neue', Helvetica, Arial, sans-serif" fontSize="50" fontWeight="bold">NOPE</text>
          <text x="45" y="200" fill="#bd4139" fontFamily="'Karla', 'Helvetica Neue', Helvetica, Arial, sans-serif" fontSize="50" fontWeight="bold">NOPE</text>
        </svg>
      </div>
    );
  }
}
