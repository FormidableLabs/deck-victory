import React from "react";
import Radium from "radium";
import _ from "lodash";
import {VictoryChart} from "victory-chart";
import {VictoryAxis} from "victory-axis";
import {VictoryScatter} from "victory-scatter";

const containerStyle = {
  background: "#ebe3db",
  border: "3px solid #b5aca3",
  width: "14em",
  height: "14em",
  margin: "0 10 10 10"
};

const axisStyle = {
  axis: {
    stroke: "#91887e",
    strokeWidth: 6,
    strokeLinecap: "square"
  },
  ticks: {stroke: "transparent"},
  tickLabels: {fill: "none"}
};

const scatterStyle = {
  data: {
    fill: "#91887e",
    strokeWidth: 3
  }
};

const labelStyle = {
  color: "#1b2633",
  fontSize: 24,
};

@Radium
export default class LineChartDiagram extends React.Component {
  static propTypes = {
    animate: React.PropTypes.bool,
    label: React.PropTypes.string
  };

  static defaultProps = {
    animate: false,
    label: ""
  };

  constructor(props) {
      super(props);
      this.state = {
        data: this.getData(),
      };
    }

  componentDidMount() {
    if (this.props.animate) {
      setInterval(() => {
        this.setState({
          data: this.getData(),
        });
      }, 2000);
    }
  }

  getData() {
    const colors = ["#91887e", "#bd4139", "#91887e", "#91887e", "#91887e"];
    return [
      {x: 1, y: _.random(3, 20), fill: colors[_.random(0, 4)]},
      {x: 2, y: _.random(3, 20), fill: colors[_.random(0, 4)]},
      {x: 3, y: _.random(3, 20), fill: colors[_.random(0, 4)]},
      {x: 4, y: _.random(3, 20), fill: colors[_.random(0, 4)]},
      {x: 5, y: _.random(3, 20), fill: colors[_.random(0, 4)]}
    ];
  }

  render() {
    return (
      <div>
        <h1 style={labelStyle}>{this.props.label}</h1>
        <svg style={containerStyle}>
          <VictoryChart width={225} height={225} padding={35}
            standalone={false} domain={{x: [0, 5.5], y: [0, 23]}}
          >
            <VictoryScatter
              animate={{velocity: 0.01}}
              style={scatterStyle}
              data={this.state.data}
              size={5}
            />
          <VictoryAxis style={axisStyle}/>
            <VictoryAxis dependentAxis style={axisStyle}/>
          </VictoryChart>
        </svg>
      </div>
    );
  }
}
