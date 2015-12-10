<VictoryChart>
  <VictoryAxis
    style={{
      tickLabels: {fill: "none"},
    }}
  />
  <VictoryLine
    y={(x) =>  Math.sin(2 * Math.PI * x)}
    style={{
      data: {stroke: "#bd4139"}
    }}
  />
  <VictoryBar
    data={[
      {x: -0.75, y: -0.75},
      {x: -0.25, y: -0.25},
      {x: 0.25, y: 0.25},
      {x: 0.75, y: 0.75}
    ]}
  />
</VictoryChart>
