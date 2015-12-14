<VictoryAxis
  style={{
    axis: {stroke: "black"},
      grid: {
        strokeWidth: 2,
        stroke: (tick) => tick == "Earth" ?
          "red" : "grey"
      },
      ticks: {
        stroke: (tick) => tick == "Earth" ?
          "red" : "grey"
      },
      tickLabels: {
        fontSize: (tick) => tick == "Earth"?
          16 : 12
      }
  }}
  tickValues={[
    "Mercury", "Venus","Earth",
    "Mars", "Jupiter"
  ]}
/>
