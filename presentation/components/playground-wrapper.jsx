import React from "react";
import Radium from "radium";
import Playground from "component-playground";
import * as V from "victory";
import {
  VictoryChart, VictoryBar, VictoryAxis, VictoryLine, VictoryScatter, VictoryPie
} from "victory"

const examples = {
  chart1: require("!raw!!../examples/victory-chart-1")
}

@Radium
export default class PlaygroundWrapper extends React.Component {
  static propTypes = {
    codeText: React.PropTypes.string
  }

  getMainStyles() {
    return {
      display: "flex",
      flex: "1 0 auto",
      flexDirection: "column",
      "@media (min-width: 70em)": {
        "flexDirection": "row"
      }
    };
  }

  render() {
    return (
      <div className="Interactive" style={this.getMainStyles()}>
        <Playground
          codeText={this.props.codeText}
          scope={{
            React, VictoryChart, VictoryBar, VictoryAxis, VictoryLine, VictoryScatter, V
          }}
          theme="elegant"
        />
      </div>
    );
  }
}
