/*eslint-disable no-multiple-empty-lines*/
import React from "react";
import Playground from "component-playground";
// Slide abstractions
// ------------------
// Appear, BlockQuote, Cite, CodePane, Deck, Fill,
// Heading, Image, Layout, Link, ListItem, List, Quote, Slide, Text
import {
  Deck, CodePane, Heading, Image, Link, Slide, Text, Layout, List, ListItem, Fill, Fit, Appear
} from "spectacle/src/spectacle";

// victory components
import {VictoryChart} from "victory-chart";
import {VictoryAxis} from "victory-axis";
import {VictoryLine} from "victory-line";
import {VictoryBar} from "victory-bar";
import {VictoryScatter} from "victory-scatter";
import {VictoryPie} from "victory-pie";

// diagram components

import Nope from "./components/nope";
import ContainerDiagram from "./components/container-diagram";
import CssDiagram from "./components/css-diagram";
import JsDiagram from "./components/js-diagram";
import TemplateDiagram from "./components/template-diagram";
import BarChartDiagram from "./components/bar-chart-diagram";
import LineChartDiagram from "./components/line-chart-diagram";
import ScatterChartDiagram from "./components/scatter-chart-diagram";
import PieChartDiagram from "./components/pie-chart-diagram";
import PlaygroundWrapper from "./components/playground-wrapper";
import Showcase from "./components/showcase";
import Animation from "./components/animation";
import TripleAxis from "./components/triple-axis";
//examples
const examples = {
  chart1: require("!raw!!./examples/victory-chart-1"),
  sensibleDefaults: require("!raw!!./examples/sensible-defaults"),
  animation: require("!raw!!./examples/animation")
};

// Images
// ------
import preloader from "spectacle/src/utils/preloader";

const images = {
  polygons: require("../assets/img/bg/formidable/formidangles-dark.svg"),
  polygonsGray: require("../assets/img/bg/formidable/formidangles-gray.svg"),
  formidableLogo: require("../assets/img/logo/formidable-black.svg"),
  victoryLogo: require("../assets/img/logo/victory.svg")
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
          "I want to tell you about data viz components for react, but first a little background..."}>
          <Image width="100%" src={images.victoryLogo}/>
          <Text fit textFont="secondary" textColor="secondary">
            data visualization for React
          </Text>
        </Slide>

        <Slide
          notes={notes(
          "I work at Formidable",
          "JS consultancy",
          "projects for a bunch of different clients",
          "I started to notice some trends")}>
          <Image width="100%" src={images.formidableLogo}/>
        </Slide>

        {/* ---------------------------------------------------------------
          * Background: the standard approach
          * --------------------------------------------------------------- */}
        <Slide transition={["fade"]}
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

          <Text fit caps textFont="secondary" textColor="secondary">
            Everyone wants
          </Text>
          <Text fit caps textFont="secondary" textColor="secondary">
            Dashboards
          </Text>
        </Slide>

        <Slide transition={["none"]} notes={notes(
          "So we figured out how to build custom dashboards",
          "and at first it went something like this..."
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

        <Slide transition={["fade"]} notes={notes(
          "So we figured out how to build custom dashboards",
          "and at first it went something like this..."
        )}>
          <Text bold fit textFont="secondary" textColor="secondary">
            The standard
          </Text>
          <Text bold fit textFont="secondary" textColor="secondary">
            approach
          </Text>
        </Slide>

        <Slide transition={["fade"]} notes={notes(
          "The client would give us a spec, and we'd start setting up a project",
          "We'd write some JS, and some flavor of html template, and some css",
          "look at that beautiful separation of conerns",
          "and then everything would be in place to add some actual data viz",
          "and we're a JS consultancy, so choosing a data viz library was pretty easy"
        )}>
          <Layout>
              <div style={{"flex-basis": "30%", paddingTop: 80, marginRight: 20}}>
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
            <Fill>
              <Layout>
                <Appear fid="1"><JsDiagram/></Appear>
                <Appear fid="2"><TemplateDiagram/></Appear>
                <Appear fid="3"><CssDiagram/></Appear>
                <Appear fid="4">
                  <Heading size={3} textColor="secondary">
                    <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
                  </Heading>
                </Appear>
                <Appear fid="4"><ContainerDiagram label={"result"}/></Appear>
              </Layout>
            </Fill>
          </Layout>
        </Slide>

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

        <Slide notes={notes(
          "so we'd write a bunch of d3, and a bunch more css",
          "to do this really well it takes quite a bit of design effort in addition to code",
          "maybe you're equipped to take it all on yourself",
          "but if you're like me, you'll probably drink a whole lot of coffee",
          "and pester the designers in your life",
          "and eventaully end up with a nice looking chart"
        )}>
          <Layout>
              <div style={{"flex-basis": "40%", paddingTop: 100, marginRight: 20}}>
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
                  <JsDiagram highlights={[4, 5, 6, 7]}/>
                  <TemplateDiagram highlights={[2]}/>
                  <CssDiagram highlights={[6, 7]}/>
                  <Heading size={3} textColor="secondary">
                    <Appear fid="1"><i className="fa fa-coffee" style={{paddingTop: 45}}/></Appear>
                    <Appear fid="2"><i className="fa fa-coffee" style={{paddingTop: 0}}/></Appear>
                    <Appear fid="2"><i className="fa fa-coffee" style={{paddingTop: 0}}/></Appear>
                  </Heading>
                    <Appear fid="4">
                      <Heading size={3} textColor="secondary">
                        <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
                      </Heading>
                    </Appear>
                  <Appear fid="4"><BarChartDiagram label={"result"}/></Appear>
              </Layout>
            </Fill>
          </Layout>
        </Slide>

        <Slide notes={notes(
          "the chart is so nice, the client wants us to build another one"
        )}>
          <Layout>
            <div style={{"flex-basis": "60%", paddingTop: 120, marginRight: 20}}>
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

        <Slide transition={["fade"]} notes={notes(
          "so we end up writing a second view, since this chart is dealing with different data",
          "we need to write more html too, so we have somewhere to append the second chart",
          "and depending on how these charts are layed out, we might have to write a bunch more css",
          "this is pretty repetitive, but it's only two charts, so maybe we dont take the time to refactor"
        )}>
          <Layout>
            <Fit>
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
                <Appear fid="1"><JsDiagram/></Appear>
                <Appear fid="2"><TemplateDiagram/></Appear>
                <Appear fid="3"><CssDiagram /></Appear>
                <Heading size={3} textColor="secondary">
                  <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
                </Heading>
                <LineChartDiagram label={"result #2"}/>
              </Layout>
            </Fit>
          </Layout>
        </Slide>

        <Slide notes={notes(
          "and then of course the spec changes"
        )}>
          <Layout>
            <div style={{"flex-basis": "60%", paddingTop: 120, marginRight: 20}}>
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

        <Slide transition={["none"]} notes={notes(
          "And to match the new spec, we need to make changes all over the place",
          "not only is this a lot of annoying context switching, it's also pretty error prone",
          "things can get out of sync in subtle ways"
        )}>
          <Layout>
            <Fit>
              <Layout>
                  <JsDiagram highlights={[1, 2]}/>
                  <TemplateDiagram highlights={[2]}/>
                  <CssDiagram highlights={[2, 3]}/>
                  <Heading size={3} textColor="secondary">
                    <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
                  </Heading>
                  <BarChartDiagram highlightAxes label={"result #1"}/>
              </Layout>
              <Layout>
                <JsDiagram highlights={[5, 6]}/>
                <TemplateDiagram highlights={[2]}/>
                <CssDiagram highlights={[7, 6]}/>
                <Heading size={3} textColor="secondary">
                  <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
                </Heading>
                <LineChartDiagram highlightAxes label={"result #2"}/>
              </Layout>
            </Fit>
          </Layout>
        </Slide>

        <Slide transition={["fade"]} notes={notes(
          "so overall the we've found the our standard approach had",
          "some room for improvement"
        )}>
          <Heading fit textFont="secondary" size={3} textColor="secondary">
            Developer Experience
          </Heading>
          <List>
            <ListItem><Appear fid="1">Inflexible</Appear></ListItem>
            <ListItem><Appear fid="2">Lots of context switching</Appear></ListItem>
            <ListItem><Appear fid="3">Time consuming</Appear></ListItem>
            <ListItem><Appear fid="4">Error prone</Appear></ListItem>
          </List>
        </Slide>

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
              <div style={{"flex-basis": "30%", paddingTop: 80, marginRight: 20}}>
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
            <Appear fid="1"><JsDiagram label=".jsx"/></Appear>
            <Appear fid="2"><CssDiagram/></Appear>
            <Appear fid="3">
              <Heading size={3} textColor="secondary">
                <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
              </Heading>
            </Appear>
            <Appear fid="4"><ContainerDiagram label={"result"}/></Appear>
          </Layout>
        </Slide>

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

        <Slide transition={["fade"]} notes={notes(
          "there are a lot of benefits to writing components this way"
        )}>
          <Heading fit size={3} textFont="secondary" textColor="secondary">
            self-contained components
          </Heading>
          <List>
            <ListItem><Appear fid="1">No context switching</Appear></ListItem>
            <ListItem><Appear fid="2">Easy to compose and reuse</Appear></ListItem>
            <ListItem><Appear fid="3">Logic and style are tightly coupled</Appear></ListItem>
          </List>
        </Slide>

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

        <Slide transition={["fade"]} notes={notes(
          "So what happens if we take our d3 visualizations",
          "and port them to React?"
        )}>
          <Text fit textFont="secondary" textColor="secondary">
            Let’s add <em>d3</em>
          </Text>
          <Layout>
            <Appear fid="1"><BarChartDiagram label={"spec"}/></Appear>
            <Appear fid="1">
              <Heading size={3} textColor="secondary">
                <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
              </Heading>
            </Appear>
            <Appear fid="2"><JsDiagram label=".jsx" highlights={[5, 6]}/></Appear>
            <Appear fid="2">
              <Heading size={3} textColor="paleRed">
                <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
              </Heading>
            </Appear>
            <Appear fid="3"><Nope/></Appear>
          </Layout>
        </Slide>

        <Slide transition={["fade"]} notes={notes(
          "unfortunately you can't just wrap d3 in react",
          "because d3 and React have incompatible DOM models and methods for handling data"
        )}>
          <Heading fit caps size={3} textFont="secondary" textColor="paleRed">
            nope
          </Heading>
          <List>
            <ListItem><Appear fid="1">d3 makes extensive use of the DOM</Appear></ListItem>
            <ListItem><Appear fid="2">d3 mutates data</Appear></ListItem>
          </List>
        </Slide>

        <Slide transition={["fade"]} notes={notes(
          "but it didn't work...",
          "but that doesn't change the fact that this is still a great idea"
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

        <Slide transition={["none"]} notes={notes(
          "what do I mean by just a little bit of d3",
          "Well we couldn't use any of the pieces that interacted with the DOM",
          "We also needed to avoid data mutation",
          "And to be honest, some parts we just didn't care for"
        )}>
          <Text fit textFont="secondary" textColor="paleRed">
            just a little bit of d3
          </Text>
          <Appear>
            <Text bold fit textFont="secondary" textColor="secondary"
              style={{textDecoration: "line-through", padding: 2}}>
              DOM Manipulation
            </Text>
          </Appear>
          <Appear>
            <Text bold fit textFont="secondary" textColor="secondary"
              style={{textDecoration: "line-through", padding: 2}}>
              Data Mutation
            </Text>
          </Appear>
          <Appear>
            <Text bold fit textFont="monospace" textColor="secondary"
              style={{textDecoration: "line-through", padding: 2}}>
              .enter()
            </Text>
          </Appear>
        </Slide>

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

        <Slide transition={["fade"]} notes={notes(
          "but we had something a little more specific in mind"
        )}>
          <Image width="50%" src={images.victoryLogo}/>

          <Layout>
            <BarChartDiagram animate/>
            <LineChartDiagram animate/>
            <ScatterChartDiagram animate/>
            <PieChartDiagram animate/>
          </Layout>
        </Slide>

        <Slide transition={["fade"]}>
          <Image width="50%" src={images.victoryLogo}/>
          <Text textFont="primary" textColor="secondary" style={{paddingTop: 10}}>
            An ecosystem of data viz components
          </Text>
          <Text textFont="primary" textColor="secondary" style={{paddingTop: 10}}>
            for React
          </Text>
        </Slide>

        <Slide transition={["fade"]} notes={notes(
          "There are already several components in the ecosystem",
          "Before I go into more detail about any one of these",
          "I'd like to talk about what defines the ecosystem as a whole"
        )}>
          <Image width="50%" src={images.victoryLogo}/>
          <Text textFont="primary" textColor="secondary" style={{paddingTop: 10}}>
            VicoryChart
          </Text>
          <Text textFont="primary" textColor="secondary" style={{paddingTop: 10}}>
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
        </Slide>

        <Slide transition={["none"]} notes={notes(
            "opinions"
        )}>
          <Text fit textFont="secondary" textColor="secondary">
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
            "opinions"
        )}>
          <Text textFont="secondary" textColor="secondary" style={{fontSize: 90}}>
            Data viz should be
          </Text>
          <Layout>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
              easy
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
              composable
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
              powerful
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
              reusable
            </Text>
          </Layout>
        </Slide>

        <Slide transition={["none"]} notes={notes(
            "opinions"
        )}>
          <Text textFont="secondary" textColor="secondary" style={{fontSize: 90}}>
          Data viz should be
          </Text>
          <Layout>
            <Text textFont="secondary" textColor="paleRed" style={{fontSize: 55}}>
              easy
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
              composable
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
              powerful
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
              reusable
            </Text>
          </Layout>
          <Layout>
            <Text textFont="tertiary" textColor="secondary" style={{fontSize: 55}}>
              {"<VictoryPie/>"}
            </Text>
            <VictoryPie/>
          </Layout>
        </Slide>

        <Slide transition={["fade"]} notes={notes(
            "easy",
            "goal, beginners should be able to get started fast",
            "people with no JS experience should be able to style and change existing components"
        )}>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 110, paddingBottom: 50}}>
              clear API
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 100, paddingBottom: 50}}>
              sensible defaults
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 90, paddingBottom: 50}}>
              familiar style syntax
            </Text>
        </Slide>

        <Slide transition={["none"]} notes={notes(
          "add your own data",
          "style syntax",
          "lets use brand colors",
          "change color"
        )}>
          <Text textFont="secondary" textColor="secondary"
            style={{margin: "0.05rem, auto", fontSize: 55}}>
            VictoryPie
          </Text>
          <PlaygroundWrapper codeText={
            "<VictoryPie\n" +
            "  data={[\n" +
            "    {x: '<5', y: 4279},\n" +
            "    {x: '5-13', y: 9182},\n" +
            "    {x: '14-17', y: 5511},\n" +
            "    {x: '18-24', y: 7164}\n" +
            "  ]}\n" +
            "  style={{\n" +
            "    labels: {\n" +
            "      fontSize: 20,\n" +
            "      fill: 'white'\n" +
            "    }\n" +
            "  }}\n" +
            "  sliceColors={[\n" +
            "    '#b5aca3',\n" +
            "    '#91887e',\n" +
            "    '#67615c',\n" +
            "    '#d1c7bc'\n" +
            "  ]}\n" +
            "/>"
          }/>
        </Slide>

        <Slide transition={["none"]} notes={notes(
          "some more interesting props",
          "all pretty obvious to use",
          "makes it easy to play, and decide how the data looks best"
        )}>
          <Text textFont="secondary" textColor="secondary"
            style={{margin: "0.05rem, auto", fontSize: 55}}>
            VictoryPie
          </Text>
          <PlaygroundWrapper codeText={
            "<VictoryPie\n" +
            "  innerRadius={100}\n" +
            "  startAngle={-90}\n" +
            "  endAngle={90}\n" +
            "  padAngle={2}\n" +
            "/>"
          }/>
        </Slide>

        <Slide transition={["none"]} notes={notes(
            "opinions"
        )}>
          <Text textFont="secondary" textColor="secondary" style={{fontSize: 90}}>
          Data viz should be
          </Text>
          <Layout>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
              easy
            </Text>
            <Text textFont="secondary" textColor="paleRed" style={{fontSize: 55}}>
              composable
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
              powerful
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
              reusable
            </Text>
          </Layout>
          <TripleAxis/>
        </Slide>

        <Slide transition={["none"]} notes={notes(
          "let's take a look at chart",
          "more sensible defaults",
          "this is actually a composed example"
        )}>
          <Text textFont="secondary" textColor="secondary"
            style={{margin: "0.05rem, auto", fontSize: 55}}>
            VictoryChart
          </Text>
          <PlaygroundWrapper codeText={"<VictoryChart/>"}/>
        </Slide>

        <Slide transition={["none"]} notes={notes(
          "with the sensible default children"
        )}>
          <Text textFont="secondary" textColor="secondary"
            style={{margin: "0.05rem, auto", fontSize: 55}}>
            VictoryChart
          </Text>
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

        <Slide transition={["none"]} notes={notes(
          "VictoryChart is a composition helper",
          "It doesn't render any of it's own elements",
          "It just coordinates the bevavior of its children"
        )}>
          <Text textFont="secondary" textColor="secondary"
            style={{margin: "0.05rem, auto", fontSize: 55}}>
            VictoryChart
          </Text>
          <PlaygroundWrapper codeText={
            "<VictoryChart>\n" +
            "  <VictoryLine\n" +
            "    y={(x) => Math.sin(2 * Math.PI * x)}\n" +
            "  />\n" +
            "</VictoryChart>"
          }/>
        </Slide>


        <Slide transition={["fade"]} notes={notes(
          "composing charts of different types",
          "domain is automatically set"
        )}>
          <Text textFont="secondary" textColor="secondary"
            style={{margin: "0.05rem, auto", fontSize: 55}}>
            VictoryChart
          </Text>
          <PlaygroundWrapper codeText={examples.chart1}/>
        </Slide>


        <Slide transition={["none"]} notes={notes(
            "opinions"
        )}>
          <Text textFont="secondary" textColor="secondary" style={{fontSize: 90}}>
          Data viz should be
          </Text>
          <Layout>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
              easy
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
              composable
            </Text>
            <Text textFont="secondary" textColor="paleRed" style={{fontSize: 55}}>
              powerful
            </Text>
            <Text textFont="secondary" textColor="secondary" style={{fontSize: 55}}>
              reusable
            </Text>
          </Layout>
          <Showcase/>
        </Slide>

      </CustomDeck>
    );
  }
}
