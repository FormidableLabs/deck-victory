<VictoryScatter height={400}
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
