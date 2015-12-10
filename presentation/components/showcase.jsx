import React from "react";
import Radium from "radium";
import {VictoryChart} from "victory-chart";
import {VictoryAxis} from "victory-axis";
import {VictoryLine} from "victory-line";
import {VictoryBar} from "victory-bar";
import {VictoryScatter} from "victory-scatter";
import {VictoryPie} from "victory-pie";


@Radium
export default class Showcase extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        data: this.getData(),
      };
    }

    getData() {
      return _.map(_.range(3), (index) => {
        return [
          {x: "apples", y: _.random(0.5, 6)},
          {x: "oranges", y: _.random(0.5, 6)},
          {x: "bananas", y: _.random(0.5, 6)},
          {x: "pears", y: _.random(0.5, 6)},
          {x: "peaches", y: _.random(0.5, 6)},
        ];
      });
    }

    componentDidMount() {
      setInterval(() => {
        this.setState({
          data: this.getData(),
        });
      }, 3000);
    }

    render() {
      return (
        <VictoryChart
          animate={{velocity: 0.02}}
          height={500}
          width={900}
          padding={75}
          domain={{x: [0.5, 5.5]}}
        >
          <VictoryAxis dependentAxis
            style={{
              axis: {stroke: "transparent"},
              ticks: {stroke: "transparent"},
              tickLabels: {fill: "none"},
              grid: {strokeWidth: 2, stroke: "#b5aca3"}
            }}
            tickValues={[4, 8 , 12]}
          />
        <VictoryBar stacked
            style={{
              data: {width: 25, padding: 15}
            }}
            data={this.state.data}
            dataAttributes={[
              {fill: "#bd4139"},
              {fill: "#91887e"},
              {fill: "#b5aca3"},
            ]}
          />
          <VictoryAxis
            style={{
              axis: {strokeWidth: 4, stroke: "#67615c"},
              ticks: {stroke: "transparent"},
              tickLabels: {fill: "transparent"}
            }}
          />
        </VictoryChart>
      );
    }
}
