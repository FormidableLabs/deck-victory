import React from "react";
import _ from "lodash";
import {VictoryChart} from "victory-chart";
import {VictoryAxis} from "victory-axis";
import {VictoryLine} from "victory-line";

export default class Animation extends React.Component {
   constructor(props) {
    super(props);
    this.state = { data: this.getData(),
      style: this.getStyles()
    };
  }

  getData() {
    return _.map(_.range(25), (i) => {
      return { x: i, y: Math.random()};
    });
  }

  getStyles() {
    const colors = ["#2b303b", "#b5aca3", "#bd4139"];
    return {
      stroke: colors[_.random(0, 2)],
      strokeWidth: _.random(2, 5)
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        data: this.getData(),
        style: this.getStyles()
      });
    }, 3000);
  }

  render() {
    return (
      <VictoryChart
        animate={{velocity: 0.02}}>
        <VictoryLine
          data={this.state.data}
          style={{data: this.state.style}}/>
      </VictoryChart>
    );
  }
}
