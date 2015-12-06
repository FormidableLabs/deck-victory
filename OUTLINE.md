Victory
=======

- formidable consultancy

- EVERYONE WANTS DASHBOARDS
  - good news: there are a lot of great tools out there for making dashboards
  - ~~bad~~ better news: EVERYONE WANTS _CUSTOM_ DASHBOARDS
  - so...
    we wrote a lot of d3
    (small) and templates, and css, and event handlers, and more d3
  - and
    (small) this meant a lot of context switching, and it was kind of annoying and tedious
    Everyone was happy

- then about a year ago EVERYONE DECIDED TO USE REACT
  - our clients were excited about it
  - our developers were excited about it
  - we started to write some awesome tools

- problems with D3 + react
- what problems radium solves

(don't lead with the big reveal)

- show anything that is not possible or easy otherwise
  (editing the demo in the slides, or with animation)
- same thing, frame the demo with the outline / image of a phone screen




# An ecosystem of modular data visualization components for React



# Built with React, Radium, and a little bit of d3
  - React: I'm guessing we all know and love React
  - Radium: a set of tools for managing inline styles for React Components
  - a little bit of d3
    - scale, interpolation, layouts... the beautiful math that d3 does best
    - _keep it away from the DOM_
    - _don't let it mutate data_
    - D3 is deprecated in victory and is not part of docs, APIs etc (under the hood only)

# What do we get from these tools?
  - logic, markup and styles all in one place
    - this is the _best_ way to think about visualizing data
  - reusable components that we can customize with props
  - modular, self-contained components that manage their own state, and automatically
    re-render when they receive new data

# What makes it an ecosystem?
  - _opinions and execution_

Easy to use
  - clear, readable api,
  - sensible defaults (all props are optional)
    - show VictoryPie with no props
  - declarative composition
    - show simple composed example without chart
    - point out familiar CSS like style object with Radium
  - VictoryChart
    - show same example in VictoryChart. Change the data, and watch the axes change.

Flexible
  - What if I need more axes?
    - show 3 axis example
  - What if I want to highlight a specific piece of data?
    - show example
  - What if I want to make every point greater than 5 red?
   - I could map over all my data, and add `fill: "red"` or...
   - functional styles
  - How'd you do that?

- composed -- it's components all the way down!
  - every tiny piece of your chart is a component, and each piece is responsible
  for it's own style, behavior, state, etc
  - that means:
    - FUNCTIONAL STYLES
    - (individually addressable canvas elements? are we going with canvas?)
    - individual control over animation

- COMING SOON:
  - individual control over events / interactivity
    -

- Call to action
  - we need help, contribute or work for us
