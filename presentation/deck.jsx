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

import ContainerDiagram from "./components/container-diagram";
import CssDiagram from "./components/css-diagram";
import JsDiagram from "./components/js-diagram";
import TemplateDiagram from "./components/template-diagram";
import BarChartDiagram from "./components/bar-chart-diagram";
import LineChartDiagram from "./components/line-chart-diagram";


// Images
// ------
import preloader from "spectacle/src/utils/preloader";

const images = {
  polygons: require("../assets/img/bg/formidable/formidangles-dark.svg"),
  polygonsGray: require("../assets/img/bg/formidable/formidangles-gray.svg"),
  formidableLogo: require("../assets/img/logo/formidable-black.svg")
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

          <Slide id="title"
            notes={
            "I want to tell you about data vix components for react, but first a little background..."}>
            <Text bold fit textFont="primary">
              Victory
            </Text>
            <Text bold fit textFont="primary">
              data visualization for React
            </Text>
          </Slide>

          <Slide id="formidable"
            notes={notes(
            "I work at a JS consultancy called Formidable",
            "were located in Fremont",
            "I've been working for formidable for about 2 years",
            "my colleagues and I have worked on projects for a bunch of different clients",
            "I started to notice some trends")}>
            <Image width="100%" src={images.formidableLogo}/>
          </Slide>

        {/* ---------------------------------------------------------------
          * Background
          * --------------------------------------------------------------- */}
          <Slide id="dashboards-0" transition={"fade"}
            notes={notes(
            "So, this isn't very surprising",
            "we have access to more data more easliy than ever before",
            "and this data becomes very valuable when we can extract useful information from it",
            "and start to make decisions based on it",
            "humans are excellent visual pattern matchers",
            "representing data visually is a very effective way to extract that information",
            "There are entire companies built around this idea",
            "I walked past tableau on my way here tonight, in fact",
            "solutions to this problem already exist, but we're a consultancy... so",
            "when our clients say 'we want dashboards', we know they really mean"
          )}>

            <Text bold fit caps textFont="primary">
              Everyone wants
            </Text>
            <Text bold fit caps textFont="primary">
              Dashboards
            </Text>
          </Slide>

          <Slide id="dashboards-1" transition={"fade"} notes={notes(
            "So we figured out how to build custom dashboards",
            "and at first it went something like this..."
          )}>
            <Text bold fit caps textFont="primary">
              Everyone wants
            </Text>
            <Text bold fit caps textFont="primary">
              custom
            </Text>
            <Text bold fit caps textFont="primary">
              Dashboards
            </Text>
          </Slide>

          <Slide id="diagram-0" notes={notes(
            "The client would give us a spec, and we'd start setting up a project",
            "We'd write some JS, and some flavor of html template, and some css",
            "look at that beautiful separation of conerns",
            "and then everything would be in place to add some actual data viz",
            "and we're a JS consultancy, so choosing a data viz library was pretty easy"
          )}>
            <BarChartDiagram label={"spec"}/>
            <Layout>
              <Fill>
                <Layout>
                    <Appear fid={1}><JsDiagram/></Appear>
                    <Appear fid={1}><TemplateDiagram/></Appear>
                    <Appear fid={1}><CssDiagram/></Appear>
                    <Appear fid={1}>
                      <Heading size={3} textColor="sand">
                        <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
                      </Heading>
                    </Appear>
                  <Appear fid={1}><ContainerDiagram label={"result"}/></Appear>
                </Layout>
              </Fill>
            </Layout>
          </Slide>

          <Slide id="d3-0" transition={"fade"} notes={notes(
            "of course we picked d3",
            "how many of you have used d3? pretty much everyone?"
          )}>
            <Text bold fit textFont="primary">
              enter d3
            </Text>
          </Slide>

          <Slide id="d3-1" transition={"fade"} notes={notes(
            "so you know it has its share of oddities",
            "but once you get past the learning curve, it's really very useful"
          )}>
            <Text bold fit textFont="primary">
              .enter( ) d3
            </Text>
          </Slide>

          <Slide id="diagram-d3-0" notes={notes(
            "so we'd write a bunch of d3, and a bunch more css",
            "to do this really well it takes quite a bit of design effort in addition to code",
            "maybe you're equipped to take it all on yourself",
            "but if you're like me, you'll probably drink a whole lot of coffee",
            "and pester the designers in your life",
            "and eventaully end up with a nice looking chart"
          )}>
            <BarChartDiagram label={"spec"}/>
            <Layout>
              <Fill>
                <Layout>
                    <JsDiagram highlights={[4, 5, 6, 7]}/>
                    <TemplateDiagram highlights={[2]}/>
                    <CssDiagram highlights={[6, 7]}/>
                      <Appear fid={1}>
                        <Heading size={3} textColor="sand">
                          <i className="fa fa-coffee" style={{paddingTop: 45}}/>
                          <i className="fa fa-coffee" style={{paddingTop: 0}}/>
                          <i className="fa fa-coffee" style={{paddingTop: 0}}/>
                        </Heading>
                      </Appear>
                      <Appear fid={1}>
                        <Heading size={3} textColor="sand">
                          <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
                        </Heading>
                      </Appear>
                    <Appear fid={1}><BarChartDiagram label={"result"}/></Appear>
                </Layout>
              </Fill>
            </Layout>
          </Slide>

          <Slide id="diagram-d3-1" notes={notes(
            "and then of course the spec would change"
          )}>
            <Layout>
              <Fill>
                <BarChartDiagram label={"spec #1"}/>
                <LineChartDiagram label={"spec #2"}/>
              </Fill>
            </Layout>
          </Slide>

          <Slide id="diagram-d3-2" notes={notes(
            "It's a lot easier this time around, you can reuse a lot of the patterns",
            
          )}>
            <Layout>
              <Fit>
                <Layout>
                    <JsDiagram/>
                    <TemplateDiagram/>
                    <CssDiagram/>
                    <Heading size={3} textColor="sand">
                      <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
                    </Heading>
                    <BarChartDiagram label={"result #1"}/>
                </Layout>
                <Layout>
                  <Appear fid={1}><JsDiagram/></Appear>
                  <Appear fid={1}><TemplateDiagram/></Appear>
                  <Appear fid={1}><CssDiagram /></Appear>
                  <Heading size={3} textColor="sand">
                    <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
                  </Heading>
                  <LineChartDiagram label={"result #2"}/>
                </Layout>
              </Fit>
            </Layout>
          </Slide>

          <Slide>
            <Layout>
              <Fit>
                <Layout>
                  <JsDiagram highlights={[5, 6]}/>
                  <TemplateDiagram highlights={[0, 1, 2]}/>
                  <CssDiagram highlights={[0, 1, 2, 3]}/>
                  <BarChartDiagram/>
                </Layout>
                <Layout>
                  <JsDiagram highlights={[5, 6]}/>
                  <TemplateDiagram highlights={[0, 1, 2]}/>
                  <CssDiagram highlights={[0, 1, 2, 3]}/>
                  <LineChartDiagram/>
                </Layout>
              </Fit>
            </Layout>
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
