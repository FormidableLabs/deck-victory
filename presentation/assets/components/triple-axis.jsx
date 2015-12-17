/*global document:false*/
import React from "react";
import _ from "lodash";
import {VictoryAxis} from "victory-axis";
import {VictoryLine} from "victory-line";

const style = {
  parent: {
    width: 800,
    height: 500,
    margin: 50,
    padding: 20,
  }
};

export default class TripleAxis extends React.Component {
  render() {
    return (
      <div className="demo">
        <svg style={style.parent}>
          <VictoryAxis
            style={{
              axis: {strokeWidth: 3},
              tickLabels: {fontSize: 12}
            }}
            width={750}
            height={400}
            domain={[0, 20]}
            label="Time in microseconds"
            standalone={false}/>

          <VictoryAxis dependentAxis
            style={{
              axis: {stroke: "#2b303b", strokeWidth: 3},
              ticks: {stroke: "#2b303b"},
              tickLabels: {fontSize: 12}
            }}
            width={750}
            height={400}
            domain={[-200, 200]}
            label="Low Frequency"
            standalone={false}/>

          <VictoryAxis dependentAxis
            style={{
              axis: {stroke: "#bd4139", strokeWidth: 2},
              ticks: {stroke: "#bd4139"},
              tickLabels: {fontSize: 12}
            }}
            width={750}
            height={400}
            orientation="right"
            domain={[-0.8, 0.8]}
            label="High Frequency"
            standalone={false}/>

          <VictoryLine
            style={{
              data: {stroke: "#2b303b", strokeWidth: 3}
            }}
            width={750}
            height={400}
            y={(x) => 200 * Math.exp(-0.05 * x) * Math.sin(x)}
            interpolation="basis"
            domain={{
              x: [0, 20],
              y: [-200, 200]
            }}
            standalone={false}/>

          <VictoryLine
            style={{
              data: {stroke: "#bd4139", strokeWidth: 3}
            }}
            width={750}
            height={400}
            y={(x) => 0.8 * Math.exp(-0.5 * x) * Math.sin(10 * x)}
            interpolation="basis"
            samples={450}
            domain={{
              x: [0, 20],
              y: [-0.8, 0.8]
            }}
            standalone={false}/>
        </svg>
      </div>
    );
  }
}
