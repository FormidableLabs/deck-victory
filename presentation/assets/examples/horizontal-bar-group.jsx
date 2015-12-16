<VictoryBar
  horizontal
  domain={{y: [0, 4]}}
  height={400}
  style={{
    data: {width: 20},
    labels: {fontSize: 18}
  }}
  data={[
    [{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 1}],
    [{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}],
    [{x: 1, y: 3}, {x: 2, y: 4}, {x: 3, y: 2}]
  ]}
  labels={["one", "two", "three"]}
  dataAttributes={[
    {fill: "tomato"},
    {fill: "orange"},
    {fill: "cornflowerblue"}
  ]}
/>
