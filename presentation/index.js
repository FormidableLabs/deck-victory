// Import React
import React from "react";
import { render } from "react-dom";

// Import Spectacle Core tags
import {
  Appear, BlockQuote, Cite, CodePane, Deck, Fill, Heading, Image, Layout, Link,
  ListItem, List, Markdown, Quote, Slide, Spectacle, Text
} from "spectacle";

// victory components
import {VictoryChart} from "victory-chart";
import {VictoryAxis} from "victory-axis";
import {VictoryLine} from "victory-line";
import {VictoryBar} from "victory-bar";
import {VictoryScatter} from "victory-scatter";
import {VictoryPie} from "victory-pie";



// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import components
import Nope from "./assets/components/nope.jsx";
import ContainerDiagram from "./assets/components/container-diagram";
import CssDiagram from "./assets/components/css-diagram";
import LongCssDiagram from "./assets/components/long-css-diagram";
import JsDiagram from "./assets/components/js-diagram";
import TemplateDiagram from "./assets/components/template-diagram";
import BarChartDiagram from "./assets/components/bar-chart-diagram";
import LineChartDiagram from "./assets/components/line-chart-diagram";
import ScatterChartDiagram from "./assets/components/scatter-chart-diagram";
import PieChartDiagram from "./assets/components/pie-chart-diagram";
import PlaygroundWrapper from "./assets/components/playground-wrapper";
import Showcase from "./assets/components/showcase";
import Animation from "./assets/components/animation";
import TripleAxis from "./assets/components/triple-axis";
//examples
const examples = {
  customPie: require("!raw!!./assets/examples/custom-pie"),
  customDonut: require("!raw!!./assets/examples/custom-donut"),
  chart1: require("!raw!!./assets/examples/victory-chart-1"),
  sensibleDefaults: require("!raw!!./assets/examples/sensible-defaults"),
  animation: require("!raw!!./assets/examples/animation"),
  stackedBars: require("!raw!!./assets/examples/stacked-bars"),
  horizontalBarGroup: require("!raw!!./assets/examples/horizontal-bar-group"),
  functionalStyles: require("!raw!!./assets/examples/functional-styles"),
  functionalStylesAxis: require("!raw!!./assets/examples/functional-styles-axis")
};

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");
require("./assets/styles/victory.css");

const images = {
  formidableLogo: require("./assets/img/formidable-black.svg"),
  victoryLogo: require("./assets/img/victory.svg")
};

const colors = {
  primary: "#f6f2ee",
  secondary: "#1b2633", // deepNavy
  tertiary: "#5e5c5c",
  // victory colors
  deepNavy: "#1b2633",
  navy: "#2b303b",
  // Sand
  whiteSand: "#ede7e1",
  palestSand: "#ebe3db",
  palerSand: "#e1d7cd",
  paleSand: "#d1c7bc",
  sand: "#b5aca3",
  darkSand: "#91887e",
  darkerSand: "#67615c",
  darkestSand: "#4d4945",
  mud: "#34302e",
  // Red
  palestRed: "#E5847D",
  palerRed: "#C75B54",
  paleRed: "#bd4139",
  red: "#bd1e13"
};

const fonts = {
  secondary: "'Karla', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  primary: "'Didot', 'Bodoni MT', 'Cochin', 'Baskerville', 'Goudy Old Style', 'Bitstream Charter', serif",
  tertiary: "'Source Code Pro', 'Inconsolata', 'Courier New', 'Courier', monospace"
};

import createTheme from "spectacle/lib/themes/default";
const theme = createTheme(colors, fonts);

preloader(images);

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

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <CustomDeck progress="bar" transition={["slide"]}>
          {/* ---------------------------------------------------------------
            * Title
            * --------------------------------------------------------------- */}
{/* 1 */}
          <Slide id="title"
            notes={
            "I want to tell you about data viz components for react, but first a little background..."}>
            <Image width="100%" src={images.victoryLogo}/>
            <Text fit textFont="secondary" textColor="secondary">
              data visualization for React
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{paddingTop: "2rem"}}>
              victory.formidable.com
            </Text>
          </Slide>
{/* 1 */}
          <Slide
            notes={notes(
            "I work at Formidable",
            "JS consultancy in fremont",
            "Ive worked on projects for a number of different clients",
            "I started to notice some trends")}>
            <Image width="100%" src={images.formidableLogo}/>
            <Layout>
              <Heading size={3} textColor={colors.secondary}>
                <i className="fa fa-github"/> boygirl
              </Heading>
            </Layout>
          </Slide>

          {/* ---------------------------------------------------------------
            * Background: the standard approach
            * --------------------------------------------------------------- */}
{/* 2 */}
          <Slide transition={["fade"]}
            notes={notes(
            "So, this isn't very surprising we have access to more data than ever before",
            "and this data becomes very valuable when we can extract useful information from it",
            "and start to make business decisions based on that information",
            "humans are excellent visual pattern matchers so representing data visually very effective",
            "There are entire companies built around this idea",
            "I think if we stood on the roof of this building we'd be able to see tableau",
            "solutions to this problem already exist, but we're a consultancy... so",
            "when our clients say 'we want dashboards', we know they really mean"
          )}>

            <Text fit caps textFont="secondary" textColor="secondary">
              Everyone wants
            </Text>
            <Text fit caps textFont="secondary" textColor="secondary">
              Dashboards
            </Text>
          </Slide>
{/* 3 */}
          <Slide transition={["none"]} notes={notes(
            "So we figured out how to build custom dashboards"
          )}>
            <Text fit caps textFont="secondary" textColor="secondary">
              Everyone wants
            </Text>
            <Text bold fit caps textFont="secondary" textColor="paleRed">
              custom
            </Text>
            <Text fit caps textFont="secondary" textColor="secondary">
              Dashboards
            </Text>
          </Slide>
{/* 4 */}
          <Slide transition={["fade"]} notes={notes(
            "and at first it went something like this..."
          )}>
            <Text bold fit textFont="secondary" textColor="secondary">
              The standard
            </Text>
            <Text bold fit textFont="secondary" textColor="secondary">
              approach
            </Text>
          </Slide>
{/* 5 */}
          <Slide transition={["fade"]} notes={notes(
            "The client would give us a spec, and we'd start setting up a project",
            "We'd write some JS, and some flavor of html template, and some css",
            "look at that beautiful separation of conerns",
            "and then everything would be in place to add some actual data viz",
            "and we're a JS consultancy, so choosing a data viz library was pretty easy"
          )}>
            <Layout>
                <div style={{flexBasis: "30%", paddingTop: 80, marginRight: 20}}>
                  <Text textFont="secondary" textColor="secondary">
                    the
                  </Text>
                  <Text bold fit textFont="secondary" textColor="secondary">
                    setup
                  </Text>
                </div>
              <BarChartDiagram label={"spec"}/>
            </Layout>
              <Layout>
                <Appear fid="1"><div><JsDiagram/></div></Appear>
                <Appear fid="2"><div><TemplateDiagram/></div></Appear>
                <Appear fid="3"><div><CssDiagram/></div></Appear>
                <Appear fid="4">
                  <Heading size={3} textColor={colors.secondary}>
                    <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
                  </Heading>
                </Appear>
                <Appear fid="5"><div><ContainerDiagram label={"result"}/></div></Appear>
              </Layout>
          </Slide>
{/* 6 */}
          <Slide notes={notes(
            "of course we picked d3",
            "how many of you have used d3? pretty much everyone?"
          )}>
            <Text bold fit textFont="secondary" textColor="secondary">
              enter d3
            </Text>
          </Slide>

          <Slide transition={["none"]} notes={notes(
            "so you know it has its share of oddities",
            "but once you get past the learning curve, it's really very useful"
          )}>
            <Text bold fit textFont="secondary" textColor="secondary">
              .enter( ) d3
            </Text>
          </Slide>
{/* 7 */}
          <Slide notes={notes(
            "so we'd write a bunch of d3, and a bunch more css",
            "to do this really well it takes quite a bit of design effort in addition to code",
            "maybe you're equipped to take it all on yourself",
            "but if you're like me, you'll probably drink a whole lot of coffee",
            "and pester the designers in your life",
            "and eventaully end up with a nice looking chart"
          )}>
            <Layout>
                <div style={{flexBasis: "40%", paddingTop: 100, marginRight: 20}}>
                  <Text textFont="secondary" textColor="secondary">
                    creating a chart
                  </Text>
                  <Text bold fit textFont="secondary" textColor="paleRed">
                    with d3
                  </Text>
                </div>
              <BarChartDiagram label={"spec"}/>
            </Layout>
            <Layout>
              <Fill>
                <Layout>
                  <Appear fid="1"><div><JsDiagram highlights={[4, 5, 6, 7]}/></div></Appear>
                  <Appear fid="2"><div><TemplateDiagram highlights={[2]}/></div></Appear>
                  <Appear fid="3"><div><CssDiagram highlights={[6, 7]}/></div></Appear>
                  <Appear fid="4">
                    <Heading size={3} textColor="secondary">
                      <i className="fa fa-coffee" style={{paddingTop: 45}}/>
                      <i className="fa fa-coffee" style={{paddingTop: 0}}/>
                      <i className="fa fa-coffee" style={{paddingTop: 0}}/>
                    </Heading>
                  </Appear>
                  <Appear fid="7">
                    <Heading size={3} textColor="secondary">
                        <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
                    </Heading>
                  </Appear>
                  <Appear fid="8"><div><BarChartDiagram label={"result"}/></div></Appear>
                </Layout>
              </Fill>
            </Layout>
          </Slide>
{/* 8 */}
          <Slide notes={notes(
            "maybe the chart is so nice, the client wants us to build another one"
          )}>
            <Layout>
              <div style={{flexBasis: "60%", paddingTop: 120, marginRight: 20}}>
                <Text textFont="secondary" textColor="secondary">
                  the scope
                </Text>
                <Text bold fit textFont="secondary" textColor="secondary">
                  always
                </Text>
                <Text fit textFont="secondary" textColor="secondary">
                  expands
                </Text>
              </div>
              <Fill>
                <BarChartDiagram label={"spec #1"}/>
                <LineChartDiagram label={"spec #2"}/>
              </Fill>
            </Layout>
          </Slide>
{/* 9 */}
          <Slide transition={["none"]} notes={notes(
            "so we end up writing a second view, since this chart is dealing with different data",
            "we need to write more html too, so we have somewhere to append the second chart"
          )}>
            <Layout>
                <JsDiagram/>
                <TemplateDiagram/>
                <CssDiagram/>
                <Heading size={3} textColor="secondary">
                  <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
                </Heading>
                <BarChartDiagram label={"result #1"}/>
            </Layout>
            <Layout>
              <Appear fid="1"><div><JsDiagram/></div></Appear>
              <Appear fid="2"><div><TemplateDiagram/></div></Appear>
              <Appear fid="3"><div><svg width={175} height={225}/></div></Appear>
              <Heading size={3} textColor="secondary">
                <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
              </Heading>
              <LineChartDiagram label={"result #2"}/>
            </Layout>
          </Slide>
{/* 10 */}
          <Slide transition={["none"]} notes={notes(
            "and depending on how these charts are layed out, we might have to write a bunch more css",
            "this is pretty repetitive, but it's only two charts, so maybe we dont take the time to refactor"
          )}>
            <Layout>
              <div>
                <JsDiagram/>
                <JsDiagram/>
              </div>
              <div>
                <TemplateDiagram/>
                <TemplateDiagram/>
              </div>
              <LongCssDiagram/>
              <div>
                <Heading size={3} textColor="secondary">
                  <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
                </Heading>
                <Heading size={3} textColor="secondary">
                  <i className="fa fa-arrow-right" style={{paddingTop: 200}}/>
                </Heading>
              </div>
              <div>
                <BarChartDiagram label={"result #1"}/>
                <LineChartDiagram label={"result #2"}/>
              </div>
            </Layout>
          </Slide>
{/* 11 */}
          <Slide notes={notes(
            "and then of course the spec changes"
          )}>
            <Layout>
              <div style={{flexBasis: "60%", paddingTop: 120, marginRight: 20}}>
                <Text textFont="secondary" textColor="secondary">
                  the spec
                </Text>
                <Text bold fit textFont="secondary" textColor="secondary">
                  always
                </Text>
                <Text fit textFont="secondary" textColor="secondary">
                  changes
                </Text>
              </div>
              <Fill>
                <BarChartDiagram highlightAxes label={"spec #1"}/>
                <LineChartDiagram highlightAxes label={"spec #2"}/>
              </Fill>
            </Layout>
          </Slide>
{/* 12 */}
          <Slide transition={["none"]} notes={notes(
            "And to match the new spec, we need to make changes all over the place",
            "not only is this a lot of annoying context switching, it's also pretty error prone",
            "things can get out of sync in subtle ways"
          )}>
            <Layout>
              <div>
                <JsDiagram highlights={[1, 2]}/>
                <JsDiagram highlights={[5, 6]}/>
              </div>
              <div>
                <TemplateDiagram highlights={[2]}/>
                <TemplateDiagram highlights={[2]}/>
              </div>
              <LongCssDiagram highlights={[2, 3, 8, 9, 10, 11, 18, 19]}/>
              <div>
                <Heading size={3} textColor="secondary">
                  <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
                </Heading>
                <Heading size={3} textColor="secondary">
                  <i className="fa fa-arrow-right" style={{paddingTop: 200}}/>
                </Heading>
              </div>
              <div>
                <BarChartDiagram highlightAxes label={"result #1"}/>
                <LineChartDiagram highlightAxes label={"result #2"}/>
              </div>
            </Layout>
          </Slide>
{/* 13 */}
          <Slide transition={["fade"]} notes={notes(
            "so overall the we've found the our standard approach had",
            "some room for improvement"
          )}>
            <Heading fit textFont="secondary" size={3} textColor="secondary">
              Developer Experience
            </Heading>
            <List>
              <ListItem textFont="secondary">Inflexible</ListItem>
              <ListItem textFont="secondary">Lots of context switching</ListItem>
              <ListItem textFont="secondary">Time consuming</ListItem>
              <ListItem textFont="secondary">Error prone</ListItem>
            </List>
          </Slide>
{/* 14 */}
          <Slide transition={["fade"]} notes={notes(
            "So we thought we could do better",
            "what if we broke our code into small reusable components",
            "put them together like legos",
            "could do that with ordinary JS, but it would be hard"
          )}>
            <Text fit textFont="secondary" textColor="secondary">
              We can do better
            </Text>
            <Layout>
              <BarChartDiagram highlightAxes highlightColor={"transparent"}/>
                <Heading size={3} textColor="secondary">
                  <i className="fa fa-plus" style={{paddingTop: 75}}/>
                </Heading>
              <BarChartDiagram highlightBars highlightColor={"transparent"}/>
              <Heading size={3} textColor="secondary">
                <i className="fa fa-arrow-right" style={{paddingTop: 75}}/>
              </Heading>
              <BarChartDiagram/>
            </Layout>
          </Slide>

          {/* ---------------------------------------------------------------
            * Background: React and Radium
            * --------------------------------------------------------------- */}
{/* 15 */}
          <Slide transition={["none"]} notes={notes(
            "Luckily there's a tool that makes it very easy",
            "so let's see how our imaginary project would go in React"
          )}>
            <Text bold fit textFont="secondary" textColor="secondary">
              React
            </Text>
          </Slide>

          <Slide transition={["fade"]} notes={notes(
            "get a spec, and start writing our first component",
            ".jsx is pretty cool, now we dont have to worry about html templates",
            "but we still have to deal with css, still have context switching"
          )}>
            <Layout>
              <div>
                <BarChartDiagram highlightAxes highlightColor={"none"} label={"bar spec"}/>
                <BarChartDiagram highlightBars highlightColor={"none"} label={"axis spec"}/>
              </div>
              <div>
                <Heading size={3} textColor="secondary">
                  <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
                </Heading>
                <Heading size={3} textColor="secondary">
                  <i className="fa fa-arrow-right" style={{paddingTop: 200}}/>
                </Heading>
              </div>
              <div>
                <JsDiagram label=".jsx"/>
                <JsDiagram label=".jsx"/>
              </div>
              <LongCssDiagram/>
              <div>
                <Heading size={3} textColor="secondary">
                  <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
                </Heading>
                <Heading size={3} textColor="secondary">
                  <i className="fa fa-arrow-right" style={{paddingTop: 225}}/>
                </Heading>
              </div>
              <div>
                <ContainerDiagram label={"bar component"}/>
                <ContainerDiagram label={"axis component"}/>
              </div>
            </Layout>
          </Slide>
{/* 16 */}
          <Slide notes={notes(
            "so we built a tool called Radium",
            "a set of tools for managing inline styles in react",
            "in other words, we dont have to write css anymore"
          )}>
            <Text bold fit textFont="secondary" textColor="paleRed">
              Radium
            </Text>
            <Appear fid="1">
              <Text textFont="secondary" textColor="paleRed">
                this machine kills CSS
              </Text>
            </Appear>
          </Slide>
{/* 17 */}
          <Slide transition={["fade"]} notes={notes(
            "and what we're left with is something really nice"
          )}>
            <Appear fid="1">
              <Text bold fit textFont="secondary" textColor="secondary">
                self-contained components
              </Text>
            </Appear>
            <Layout>
              <BarChartDiagram label={"spec"}/>
              <Heading size={3} textColor="secondary">
                <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
              </Heading>
              <JsDiagram label=".jsx"/>
              <Heading size={3} textColor="secondary">
                <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
              </Heading>
              <ContainerDiagram label={"result"}/>
            </Layout>
          </Slide>
{/* 18 */}
          <Slide transition={["fade"]} notes={notes(
            "there are a lot of benefits to writing components this way"
          )}>
            <Heading fit size={3} textFont="secondary" textColor="secondary">
              self-contained components
            </Heading>
            <List>
              <ListItem textFont="secondary">No context switching</ListItem>
              <ListItem textFont="secondary">Easy to compose and reuse</ListItem>
              <ListItem textFont="secondary">Logic and style are tightly coupled</ListItem>
            </List>
          </Slide>
{/* 19 */}
          <Slide transition={["fade"]} notes={notes(
            "ideal for data viz an especially dashboards",
            "composable parts styled completely independently, dont worry about style context",
            "shouldn't logic and style be together? Isnt that what data viz is?",
            "I guess now we just need to drop in d3"
          )}>
            <Text bold fit textFont="secondary" textColor="secondary">
              ideal for data viz
            </Text>
            <Layout>
              <BarChartDiagram label={"spec"}/>
              <Heading size={3} textColor="secondary">
                <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
              </Heading>
              <JsDiagram label=".jsx"/>
              <Heading size={3} textColor="palerSand">
                <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
              </Heading>
              <BarChartDiagram label={"result"}/>
            </Layout>
          </Slide>
{/* 20 */}
          <Slide transition={["fade"]} notes={notes(
            "So what happens if we take our d3 visualizations",
            "and port them to React?"
          )}>
            <Text fit textFont="secondary" textColor="secondary">
              Let’s add <em>d3</em>
            </Text>
            <Layout>
              <Appear fid="1"><div><BarChartDiagram label={"spec"}/></div></Appear>
              <Appear fid="2">
                <Heading size={3} textColor="secondary">
                  <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
                </Heading>
              </Appear>
              <Appear fid="3">
                <div><JsDiagram label=".jsx" highlights={[5, 6]}/></div>
              </Appear>
              <Appear fid="4">
                <Heading size={3} textColor="paleRed">
                  <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
                </Heading>
              </Appear>
              <Appear fid="5"><div><Nope/></div></Appear>
            </Layout>
          </Slide>
{/* 21 */}
          <Slide transition={["fade"]} notes={notes(
            "because d3 and React have incompatible DOM models and methods for handling data",
            "It is possible to use them together anyway, but this usually involves",
            "getting React to completely ignore whatever parts of the DOM d3 is mutating"
          )}>
            <div style={{margin: 20}}>
              <Heading size={3} textFont="secondary" textColor="paleRed">
                React
              </Heading>
              <List>
                <ListItem textFont="secondary">Manual DOM mutation breaks DOM diffing</ListItem>
                <ListItem textFont="secondary">Less performant when data is mutated</ListItem>
              </List>
            </div>
            <div style={{margin: 20}}>
              <Heading size={3} textFont="secondary" textColor="paleRed">
                d3
              </Heading>
              <List>
                <ListItem textFont="secondary">Mutates the DOM</ListItem>
                <ListItem textFont="secondary">Mutates Data</ListItem>
              </List>
            </div>
          </Slide>
{/* 22 */}
          <Slide transition={["fade"]} notes={notes(
            "so just wrapping d3 didn't work out very well",
            "but by that time we were really sold on this data viz in react idea"
          )}>
            <Text bold  fit textFont="secondary" textColor="secondary">
              How do we get there?
            </Text>
            <Layout>
              <BarChartDiagram label={"spec"}/>
              <Heading size={3} textColor="secondary">
                <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
              </Heading>
              <JsDiagram label=".jsx"/>
              <Heading size={3} textColor="palerSand">
                <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
              </Heading>
              <BarChartDiagram label={"result"}/>
            </Layout>
          </Slide>
{/* 23 */}
          <Slide transition={["fade"]} notes={notes(
            "so we thought"
          )}>
            <Text style={{fontSize: 65}} textFont="secondary" textColor="secondary">
              what if we use
            </Text>
            <Text style={{fontSize: 200}} textFont="secondary" textColor="secondary">
              React
            </Text>
            <Text style={{fontSize: 200}} textFont="secondary" textColor="paleRed">
              Radium
            </Text>
            <Text fit textFont="secondary" textColor="secondary">
              and just a little bit of d3
            </Text>
          </Slide>
{/* 24 */}
          <Slide transition={["none"]} notes={notes(
            "what do I mean by just a little bit of d3",
            "Well we couldn't use any of the pieces that interacted with the DOM",
            "We also needed to avoid data mutation",
            "And to be honest, some parts we just didn't care for"
          )}>
            <Text fit textFont="secondary" textColor="paleRed">
              just a little bit of d3
            </Text>
            <Text bold fit textFont="secondary" textColor="secondary"
              style={{textDecoration: "line-through", padding: 2}}>
              DOM Manipulation
            </Text>
            <Text bold fit textFont="secondary" textColor="secondary"
              style={{textDecoration: "line-through", padding: 2}}>
              Data Mutation
            </Text>
            <Text bold fit textFont="monospace" textColor="secondary"
              style={{textDecoration: "line-through", padding: 2}}>
              .enter()
            </Text>
          </Slide>
{/* 25 */}
          <Slide transition={["none"]} notes={notes(
            "but there are also some tremendously useful parts",
            "And d3 has recently been broken up into modules",
            "so we can pick and choose"
          )}>
            <Text fit textFont="secondary" textColor="paleRed">
              just a little bit of d3
            </Text>
            <Text bold textFont="monospace" textColor="secondary"
              style={{padding: 10, fontSize: 85}}>
              d3.shape
            </Text>
            <Text bold textFont="monospace" textColor="secondary"
              style={{padding: 10, fontSize: 85}}>
              d3.scale
            </Text>
            <Text bold textFont="monospace" textColor="secondary"
              style={{padding: 10, fontSize: 85}}>
              d3.interpolate
            </Text>
          </Slide>
{/* 26 */}
          <Slide transition={["none"]} notes={notes(
            "And all we're left with is some math",
          )}>
            <Text fit textFont="secondary" textColor="paleRed">
              just a little bit of d3
            </Text>
            <Text bold fit textFont="secondary" textColor="secondary">
              {"Math"}
            </Text>
          </Slide>
{/* 27 */}
          <Slide notes={notes(
            "so now the question becomes",
            "probably anything"
          )}>
            <Text style={{fontSize: 65}} textFont="secondary" textColor="secondary">
              what can we build with
            </Text>
            <Text style={{fontSize: 180}} textFont="secondary" textColor="secondary">
              React
            </Text>
            <Text style={{fontSize: 180}} textFont="secondary" textColor="paleRed">
              Radium
            </Text>
            <Text fit textFont="secondary" textColor="secondary">
              and math
            </Text>
          </Slide>
{/* 30 */}
          <Slide transition={["fade"]} notes={notes(
            "but we had something a little more specific in mind",
            "We wanted to make fully customizable, composable data viz components in React",
            "so we broke charts down into the smallest possible components",
            "and created an API for putting them back together again"
          )}>
            <Image width="50%" src={images.victoryLogo}/>

            <Layout>
              <BarChartDiagram animate/>
              <LineChartDiagram animate/>
              <ScatterChartDiagram animate/>
              <PieChartDiagram animate/>
            </Layout>
          </Slide>
{/* 31 */}
          <Slide transition={["fade"]} notes={notes(
            "We called it Victory, and we think of it as an ecosystem of chart components"
          )}>
            <Image width="50%" src={images.victoryLogo}/>
            <Text textFont="primary" textColor="secondary" style={{paddingTop: 10}}>
              An ecosystem of data viz components
            </Text>
            <Text textFont="primary" textColor="secondary" style={{paddingTop: 10}}>
              for React
            </Text>
          </Slide>
{/* 32 */}
          <Slide transition={["fade"]} notes={notes(
            "There are already several components our growing ecosystem",
            "You can see there are several of these atomic chart components like line and bar",
            "as well as some higher order components like Chart, and animation",
            "Before I go into more detail about any one of these",
            "I'd like to talk about what defines the ecosystem as a whole"
          )}>
            <Image width="40%" src={images.victoryLogo}/>
            <Text textFont="primary" textColor="secondary" style={{paddingTop: 0}}>
              VictoryAxis
            </Text>
            <Text textFont="primary" textColor="secondary" style={{paddingTop: 10}}>
              VictoryBar
            </Text>
            <Text textFont="primary" textColor="secondary" style={{paddingTop: 10}}>
              VictoryLine
            </Text>
            <Text textFont="primary" textColor="secondary" style={{paddingTop: 10}}>
              VictoryScatter
            </Text>
            <Text textFont="primary" textColor="secondary" style={{paddingTop: 10}}>
              VictoryPie
            </Text>
            <Text textFont="primary" textColor="secondary" style={{paddingTop: 10}}>
              VictoryLabel
            </Text>
            <Text textFont="primary" textColor="secondary" style={{paddingTop: 10}}>
              VictoryChart
            </Text>
            <Text textFont="primary" textColor="secondary" style={{paddingTop: 10}}>
              VictoryAnimation
            </Text>
          </Slide>
{/* 33 */}
          <Slide transition={["none"]} notes={notes(
              "what makes these more than just a collection of random components",
              "I want to talk briefly about the infrastructure before we dig into victory"
          )}>
            <Text fit textFont="secondary" textColor="secondary">
              opinions
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 150}}>
              &
            </Text>
            <Text fit textFont="secondary" textColor="paleRed">
              infrastructure
            </Text>
          </Slide>

          <Slide transition={["fade"]} notes={notes(
            "We knew from the beginning that we wanted each victory component to have its own npm pkg",
            "and they all needed to have identical infrastructure",
            "so we started out with a generator, and everything was fine for a bit",
            "but as we were developing, and making little changes to the infrastructure, and updating deps",
            "the repos got our of sync, and it was a tedious and manual process to sync them up"
          )}>
            <Appear>
              <Text fit textFont="primary" textColor="secondary">
                So many repos
              </Text>
            </Appear>
            <Text textFont="primary" textColor="secondary" style={{paddingTop: 30}}>
              VictoryAxis
            </Text>
            <Text textFont="primary" textColor="secondary" style={{paddingTop: 10}}>
              VictoryBar
            </Text>
            <Text textFont="primary" textColor="secondary" style={{paddingTop: 10}}>
              VictoryLine
            </Text>
            <Text textFont="primary" textColor="secondary" style={{paddingTop: 10}}>
              VictoryScatter
            </Text>
            <Text textFont="primary" textColor="secondary" style={{paddingTop: 10}}>
              VictoryPie
            </Text>
            <Text textFont="primary" textColor="secondary" style={{paddingTop: 10}}>
              VictoryLabel
            </Text>
            <Text textFont="primary" textColor="secondary" style={{paddingTop: 10}}>
              VictoryChart
            </Text>
            <Text textFont="primary" textColor="secondary" style={{paddingTop: 10}}>
              VictoryAnimation
            </Text>
          </Slide>

          <Slide transition={["none"]} notes={notes(
              "So we built a tool called builder"
          )}>
            <Text fit textFont="secondary" textColor="secondary">
              Builder
            </Text>

            <Text textFont="secondary" textColor="secondary" style={{paddingTop: 10}}>
              {"https://github.com/FormidableLabs/builder"}
            </Text>
          </Slide>

          <Slide transition={["none"]} notes={notes(
              "builder is centered around the concept of archetypes",
              "define an archetype for a project, keep all your configs and npm tasks there",
              "projects depends on builder and your archetype, and get all those behaviors and deps",
              "in addition to their own, and can always override the archtype scripts etc."
          )}>
            <Text fit textFont="secondary" textColor="paleRed">
              Archetypes
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 65, paddingTop: 100}}>
              manage shared npm scripts
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 65, paddingTop: 40}}>
              manage shared configs
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 65, paddingTop: 40}}>
              manage shared dependencies
            </Text>
          </Slide>

          <Slide transition={["none"]} notes={notes(
              "We also wanted to create beautiful, consistent docs for all of these repos",
              "We wanted prop tables and interactive code examples"
          )}>
            <Text fit textFont="secondary" textColor="secondary">
              Ecology
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{paddingTop: 50}}>
              {"https://github.com/FormidableLabs/ecology"}
            </Text>
          </Slide>

          <Slide transition={["none"]} notes={notes(
              "We also wanted to create beautiful, consistent docs for all of these repos",
              "We wanted prop tables and interactive code examples"
          )}>
            <Text fit textFont="secondary" textColor="secondary">
              Living Docs
            </Text>
            <Text textFont="secondary" textColor="secondary"  style={{fontSize: 65, paddingTop: 100}}>
              Generated from PropTypes
            </Text>
            <Text textFont="secondary" textColor="secondary"  style={{fontSize: 65, paddingTop: 40}}>
              support markdown
            </Text>
            <Text textFont="secondary" textColor="secondary"  style={{fontSize: 65, paddingTop: 40}}>
              Interactive code examples
            </Text>
          </Slide>

          <Slide transition={["none"]} notes={notes(
              "Now I'd like to talk very briefly about infrastructure",
              "spoiler alert. this section could also be called 'dogfooding our own OSS'"
          )}>
            <Text fit textFont="secondary" textColor="paleRed">
              opinions
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 150}}>
              &
            </Text>
            <Text fit textFont="secondary" textColor="secondary">
              infrastructure
            </Text>
          </Slide>


          <Slide transition={["none"]} notes={notes(
              "When we were designing the API for Victory we were trying to make something..."
          )}>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 90}}>
              Data viz should be
            </Text>
            <Layout>
              <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
                friendly
              </Text>
              <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
                flexible
              </Text>
              <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
                composable
              </Text>
            </Layout>
          </Slide>
{/* 34 */}
          <Slide transition={["none"]} notes={notes(
              "easy: we wanted victory to have a very gentle learning curve",
              "beginners should be able to get stated FAST without a ton of configuration",
              "so we baked in a set of sensible defaults and even sample data",
              "every component will render something even when no props are passed in"
          )}>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 90}}>
            Data viz should be
            </Text>
            <Layout>
              <Text textFont="secondary" textColor="paleRed" style={{fontSize: 55}}>
                friendly
              </Text>
              <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
                flexible
              </Text>
              <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
                composable
              </Text>
            </Layout>
            <Layout>
              <Text textFont="tertiary" textColor="secondary"
                style={{marginTop: "150px", fontSize: 60}}>
                {"<VictoryPie/>"}
              </Text>
              <VictoryPie/>
            </Layout>
          </Slide>
{/* 35 */}
          <Slide className="FullSlide" transition={["none"]} notes={notes(
            "We also wanted to make it very straightforward to style and change components",
            "even for people with little to no JS experience",
            "here's the syntax for adding your own data and changing the colors",
            "--- make a change to the data ---",
            "You can also style the chart with some very familiar looking style syntax",
            "---- change the font size ----",
            "There's still a lot going on in this chart that we didn't have to define",
            "Cats: still winning the internet"
          )}>
            <PlaygroundWrapper codeText={examples.customPie}/>
          </Slide>
{/* 36 */}
          <Slide className="FullSlide"  transition={["none"]} notes={notes(
            "some more interesting props",
            "all pretty obvious to use",
            "makes it easy to play, and decide how the data looks best"
          )}>
            <PlaygroundWrapper codeText={examples.customDonut}/>
          </Slide>
{/* 37 */}
          <Slide  notes={notes(
              "I've already talked a lot about all the benefits of building data viz from composable components"
          )}>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 90}}>
            Data viz should be
            </Text>
            <Layout>
              <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
                friendly
              </Text>
              <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
                flexible
              </Text>
              <Text textFont="secondary" textColor="paleRed" style={{fontSize: 55}}>
                composable
              </Text>
            </Layout>
            <TripleAxis/>
          </Slide>
{/* 38 */}
          <Slide className="FullSlide"  notes={notes(
            "let's take a look at chart, Chart is actually just a wrapper for other components",
            "what we're seeing here are it's default child components, two axes and a line",
            "this is actually a composed example"
          )}>
            <PlaygroundWrapper codeText={"<VictoryChart/>"}/>
          </Slide>
{/* 39 */}
          <Slide className="FullSlide" transition={["none"]} notes={notes(
            "Here's what the code to render the same chart looks like when we explicitly define the children"
          )}>
            <PlaygroundWrapper codeText={
              "<VictoryChart>\n" +
              "  <VictoryAxis/>\n" +
              "  <VictoryAxis dependentAxis/>\n" +
              "  <VictoryLine\n" +
              "    y={(x) => x}\n" +
              "  />\n" +
              "</VictoryChart>"
            }/>
          </Slide>
{/* 40 */}
          <Slide className="FullSlide" transition={["none"]} notes={notes(
            "VictoryChart is a composition helper that coordinates the behavior of its children",
            "setting the domain based on data, laying out the axes"
          )}>
            <PlaygroundWrapper codeText={
              "<VictoryChart>\n" +
              "  <VictoryLine\n" +
              "    y={(x) => Math.sin(2 * Math.PI * x)}\n" +
              "  />\n" +
              "</VictoryChart>"
            }/>
          </Slide>
{/* 41 */}
          <Slide className="FullSlide" notes={notes(
            "composing charts of different types",
          )}>
            <PlaygroundWrapper codeText={examples.chart1}/>
          </Slide>
{/* 42 */}
          <Slide notes={notes(
              "we wanted to make victory components as customizable as possible",
              "we wanted to make it possible to change almost anything"
          )}>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 90}}>
            Data viz should be
            </Text>
            <Layout>
              <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
                friendly
              </Text>
              <Text textFont="secondary" textColor="paleRed" style={{fontSize: 55}}>
                flexible
              </Text>
              <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
                composable
              </Text>
            </Layout>
            <Showcase/>
          </Slide>
{/* 43 */}
          <Slide className="FullSlide" transition={["fade"]} notes={notes(
            "Maybe we'd like to make some stacked bar charts, easy enough",
            "but maybe the requirements change, and now wee need a grouped bar chart"
          )}>
            <PlaygroundWrapper codeText={examples.stackedBars}/>
          </Slide>
{/* 44 */}
          <Slide className="FullSlide" transition={["fade"]} notes={notes(
            "Oh, and could you make it horizontal too?",
            "having very flexible components makes responding to these changes very fast"
          )}>
            <PlaygroundWrapper codeText={examples.horizontalBarGroup}/>
          </Slide>
{/* 45 */}
          <Slide className="FullSlide" transition={["fade"]} notes={notes(
            "we wanted to make it easy for people to change these components",
            "we also wanted make it easy for DATA to change the components"
          )}>
            <PlaygroundWrapper codeText={examples.functionalStyles}/>
          </Slide>
{/* 46 */}
          <Slide className="FullSlide" transition={["fade"]} notes={notes(
            "this pattern applies to all of our data types",
            "and to axes and labels too"
          )}>
            <PlaygroundWrapper codeText={examples.functionalStylesAxis}/>
          </Slide>
{/* 47 */}
          <Slide notes={notes(
              "We have a lot more that we're working on to make it even more flexible",
              "data accessor functions will allow more flexibillity in data format",
              "data transformation on the fly",
              "Add event handlers to atomic units of data the same way we add styles.",
              "That means interactivity can be controlled by data too!",
              "support React Native. We're switching to ReactArt / Native Art, so we",
              "can support mobile and desktop platforms from the same code base"
          )}>
            <Text fit textFont="secondary" textColor="secondary">
              Coming Soon
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 55, paddingTop: 70}}>
              Data accessor functions
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 55, paddingTop: 40}}>
              General interactivity support
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 55, paddingTop: 40}}>
              Support for React Native
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 55, paddingTop: 40}}>
              More components!
            </Text>
          </Slide>

          <Slide transition={["none"]} notes={notes(
              "Stay tuned"
          )}>
            <Text fit textFont="secondary" textColor="secondary">
              Stay tuned!
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 55, paddingTop: 70}}>
              victory.formidable.com
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 55, paddingTop: 40}}>
              {"https://gitter.im/FormidableLabs/victory"}
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 55, paddingTop: 40}}>
              office hours: Jan 27th at Formidable
            </Text>
          </Slide>

          <Slide transition={["none"]} notes={notes(
              "We also wanted to create beautiful, consistent docs for all of these repos",
              "We wanted prop tables and interactive code examples"
          )}>
            <Text fit textFont="secondary" textColor="secondary">
              Thanks!
            </Text>
            <Layout>
              <Heading size={3} textColor={colors.secondary}>
                <i className="fa fa-github"/> boygirl
              </Heading>
            </Layout>
          </Slide>

        </CustomDeck>
      </Spectacle>
    );
  }
}
