import React from "react";
import Radium from "radium";
import Playground from "component-playground";
import {VictoryChart} from "victory-chart";
import {VictoryAxis} from "victory-axis";
import {VictoryLine} from "victory-line";
import {VictoryBar} from "victory-bar";
import {VictoryScatter} from "victory-scatter";
import {VictoryPie} from "victory-pie";


@Radium
export default class PlaygroundWrapper extends React.Component {
  static propTypes = {
    codeText: React.PropTypes.string,
    noRender: React.PropTypes.bool
  }

  static defaultProps = {
    noRender: true
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
            React, VictoryChart, VictoryBar, VictoryAxis, VictoryLine, VictoryScatter, VictoryPie
          }}
          noRender={this.props.noRender}
          theme="elegant"
        />
      </div>
    );
  }
}
