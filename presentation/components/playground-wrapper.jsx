import React from "react";
import Radium from "radium";
import Playground from "component-playground";
import * as V from "victory";
import {
  VictoryChart, VictoryBar, VictoryAxis, VictoryLine, VictoryScatter, VictoryPie
} from "victory"

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
            React, VictoryChart, VictoryBar, VictoryAxis, VictoryLine, VictoryScatter, VictoryPie, V
          }}
          noRender={true}
          theme="elegant"
        />
      </div>
    );
  }
}
