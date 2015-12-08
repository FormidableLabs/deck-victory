<VictoryChart domain={{x:[-1, 1]}}>
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
</VictoryChart>
