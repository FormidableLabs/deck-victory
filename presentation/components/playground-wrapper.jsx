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
  getDocsStyles() {
      return {
        margin: "1rem 0 0 0",
        padding: "1rem 0.5rem",
        "@media (min-width: 70em)": {
          flex: "1",
          margin: 0,
          padding: "60px 1rem"
        }
      };
    }

    getMainStyles() {
      return {
        display: "flex",
        flex: "1 0 auto",
        flexDirection: "column",
        margin: "0 auto",
        padding: "1rem",
        "@media (min-width: 70em)": {
          "flexDirection": "row",
          margin: "0 2.5rem"
        }
      };
    }

  render() {
    return (
      <div className="Interactive">
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
