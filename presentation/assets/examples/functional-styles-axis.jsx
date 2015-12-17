<VictoryAxis width={600} height={500}
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
        fontSize: (tick) => tick == "Earth" ?
          20 : 16
      }
  }}
  tickValues={[
    "Mercury", "Venus", "Earth",
    "Mars", "Jupiter"
  ]}
/>
