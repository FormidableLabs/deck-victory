/*eslint-disable no-multiple-empty-lines*/
import React from "react";

// Slide abstractions
// ------------------
// Appear, BlockQuote, Cite, CodePane, Deck, Fill,
// Heading, Image, Layout, Link, ListItem, List, Quote, Slide, Text
import {
  Deck, CodePane, Heading, Image, Link, Slide, Text, Layout, List, ListItem, Fill, Fit, Appear
} from "spectacle/src/spectacle";

// victory components
import {Victory} from "victory";

// diagram components

import CssDiagram from "./components/css-diagram";
import JsDiagram from "./components/js-diagram";
import TemplateDiagram from "./components/template-diagram";
import BarChartDiagram from "./components/bar-chart-diagram";


// Images
// ------
import preloader from "spectacle/src/utils/preloader";

const images = {
  polygons: require("../assets/img/bg/formidable/formidangles-dark.svg"),
  polygonsGray: require("../assets/img/bg/formidable/formidangles-gray.svg")
};

// Preload all images
preloader(Object.keys(images).map((key) => images[key]));

// Components
// ----------
// Custom overrides for the deck
class CustomDeck extends Deck {
  _handleKeyPress(e) {
    // Call base method.
    super._handleKeyPress(e);

    // Add some extra key bindings for Satechi remote.
    /*globals window:false*/
    const event = window.event || e;

    const SATECHI_PREV_KEY = 38;
    if (event.keyCode === SATECHI_PREV_KEY) {
      this._prevSlide();
    }

    const SATECHI_NEXT_KEY = 40;
    if (event.keyCode === SATECHI_NEXT_KEY) {
      this._nextSlide();
    }
  }
}

// Non-bolded heading.
const getLonelyHeadingStyles = function () {
  /*eslint-disable no-invalid-this*/
  const styles = Heading.Mixin.getStyles.call(this);
  styles.fontWeight = "normal";
  return styles;
};

class LonelyHeading extends Heading {
  constructor(props) {
    super(props);
    this.getStyles = getLonelyHeadingStyles;
  }
}

LonelyHeading.defaultProps = {
  size: 4
};

LonelyHeading.Mixin = {
  getStyles: getLonelyHeadingStyles
};

// A meaningful "point" in text.
class Point extends React.Component {
  render() {
    return (
      <span style={{fontWeight: "bold"}}>
        {this.props.children}
      </span>
    );
  }
}

Point.propTypes = {
  children: React.PropTypes.node
};

// Blackbox for white over images
class BlackBox extends React.Component {
  render() {
    const Tag = this.props.tag;
    const styles = Object.assign({
      background: `rgba(${this.props.bgRgb.join(",")}, ${this.props.bgDarken})`,
      borderRadius: "0.2em",
      padding: "0.0em 0.2em",
      margin: "0"
    }, this.props.style);

    return (
      <Tag style={styles}>
        {this.props.children}
      </Tag>
    );
  }
}

BlackBox.defaultProps = {
  tag: "span",
  bgDarken: 0.75,
  bgRgb: [0, 0, 0],
  style: {}
};

BlackBox.propTypes = {
  bgDarken: React.PropTypes.number,
  bgRgb: React.PropTypes.array,
  children: React.PropTypes.node,
  style: React.PropTypes.object,
  tag: React.PropTypes.string
};

// Links
// -----
const links = {
  /*eslint-disable max-len*/

  /*eslint-enable max-len*/
};


// Helpers
// -------
// A naive, indent preserving strip.
const strip = function (val) {
  // Find first line with text. Capture that indent level.
  let indent = null;

  return val.split("\n")
    .map((line) => {
      // Capture initial indent.
      if (indent === null && /^\s/.test(line)) {
        indent = /^ */.exec(line)[0];
      }

      // If no indent, ignore.
      if (indent === null) {
        return null;
      }

      return line
        .replace(new RegExp("^" + indent), "")
        .replace(/\s*$/, "");
    })
    .join("\n")
    .replace(/^\s*|\s$/, "");
};

// Convert note items to list.
const notes = function () {
  const args = [].slice.call(arguments);

  // HACKY: Raw HTML string insertion.
  return (
    "<ul style='font-size: 0.8em'>" +
      args.map((note) => `<li>${note}</li>`).join("") +
    "</ul>"
  );
};

// Presentation
// ------------
export default class extends React.Component {
  render() {
    return (
      <CustomDeck progress="bar" transition={["slide"]}>
        {/* ---------------------------------------------------------------
          * Title
          * --------------------------------------------------------------- */}

          <Slide>
            <Heading caps size={5}>
              everyone wants dashboards
            </Heading>
            <Layout>
              <BarChartDiagram/>
              <JsDiagram highlights={[5, 6]}/>
              <TemplateDiagram highlights={[0, 1, 2]}/>
              <CssDiagram highlights={[0, 1, 2, 3]}/>
            </Layout>


          </Slide>

        <Slide id="title" bgImage={images.polygons}>
          <Text bold fit caps textColor="primary" textFont="primary">
            VictoryJS
          </Text>
          <Text bold fit caps textColor="primary" textFont="primary">
            Data Viz in React
          </Text>
        </Slide>

        <Slide id="intro">
          <LonelyHeading size={4}>
            A <em>collection of composable react components</em> for building interactive data visualizations
          </LonelyHeading>
        </Slide>
        <Slide transition={["fade"]}>
          <Heading size={3}>
            Motivations
          </Heading>
          <List>
            <ListItem><Appear fid="1">We love data visualization</Appear></ListItem>
            <ListItem><Appear fid="2">We love <em>React</em></Appear></ListItem>
            <ListItem><Appear fid="3">We love great DevUX</Appear></ListItem>
          </List>
        </Slide>


        <Slide>
          <CssDiagram/>
          <Heading size={3}>
            <i className="fa fa-flash"></i> Seconds to Drop In
          </Heading>
          <CodePane
            lang="javascript"
            source={strip(`
              $ npm install victory-pie
            `)}
            margin="20px auto"
            style={{fontSize: "2em"}}/>
          <CodePane
            lang="javascript"
            source={strip(`
              import {VictoryPie} from "victory-pie";
            `)}
            margin="20px auto"
            style={{fontSize: "2em"}}/>
          <CodePane
            lang="javascript"
            source={strip(`
              <VictoryPie/>
            `)}
            margin="20px auto"
            style={{fontSize: "2em"}}/>
        </Slide>
      </CustomDeck>
    );
  }
}
