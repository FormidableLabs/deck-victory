<VictoryChart  height={700} width={900}>
  <VictoryScatter
    y={(x) => Math.sin(2 * Math.PI * x)}
    samples={20}
    size={(data) => 1 + data.y * 7}
    style={{
      data: {
        fill: (data) => data.y > 0 ?
          "red" : "blue"
      }
    }}
    symbol={
      (data) => data.y > 0 ?
        "triangleUp" : "square"
    }
  />
</VictoryChart>
