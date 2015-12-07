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
import * as V from "victory";
import {
  VictoryChart, VictoryBar, VictoryAxis, VictortLine, VictoryScatter, VictoryPie
} from "victory"

// diagram components

import Nope from "./components/nope";
import ContainerDiagram from "./components/container-diagram";
import CssDiagram from "./components/css-diagram";
import JsDiagram from "./components/js-diagram";
import TemplateDiagram from "./components/template-diagram";
import BarChartDiagram from "./components/bar-chart-diagram";
import LineChartDiagram from "./components/line-chart-diagram";
import PlaygroundWrapper from "./components/playground-wrapper";
//examples
const examples = {
  chart1: require("!raw!!./examples/victory-chart-1")
};

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
          <Text fit textFont="serif" textColor="secondary">
            Victory
          </Text>
          <Text fit textFont="serif" textColor="secondary">
            data visualization for React
          </Text>
        </Slide>

        <Slide
          notes={notes(
          "I work at a JS consultancy called Formidable",
          "were located in Fremont",
          "I've been working for formidable for about 2 years",
          "my colleagues and I have worked on projects for a bunch of different clients",
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

          <Text bold fit caps textFont="primary" textColor="secondary">
            Everyone wants
          </Text>
          <Text bold fit caps textFont="primary" textColor="secondary">
            Dashboards
          </Text>
        </Slide>

        <Slide transition={["none"]} notes={notes(
          "So we figured out how to build custom dashboards",
          "and at first it went something like this..."
        )}>
          <Text bold fit caps textFont="primary" textColor="secondary">
            Everyone wants
          </Text>
          <Text bold fit caps textFont="primary" textColor="secondary">
            custom
          </Text>
          <Text bold fit caps textFont="primary" textColor="secondary">
            Dashboards
          </Text>
        </Slide>

        <Slide transition={["fade"]} notes={notes(
          "So we figured out how to build custom dashboards",
          "and at first it went something like this..."
        )}>
          <Text bold fit caps textFont="primary" textColor="secondary">
            The standard
          </Text>
          <Text bold fit caps textFont="primary" textColor="secondary">
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
                <Text textFont="primary" textColor="secondary">
                  the
                </Text>
                <Text bold fit textFont="primary" textColor="secondary">
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
          <Text bold fit textFont="primary" textColor="secondary">
            enter d3
          </Text>
        </Slide>

        <Slide transition={["none"]} notes={notes(
          "so you know it has its share of oddities",
          "but once you get past the learning curve, it's really very useful"
        )}>
          <Text bold fit textFont="primary" textColor="secondary">
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
                <Text textFont="primary" textColor="secondary">
                  creating a chart
                </Text>
                <Text bold fit textFont="primary" textColor="paleRed">
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
          "and then of course the spec would change"
        )}>
          <Layout>
            <div style={{"flex-basis": "60%", paddingTop: 120, marginRight: 20}}>
              <Text textFont="primary" textColor="secondary">
                the spec
              </Text>
              <Text bold fit textFont="primary" textColor="secondary">
                always
              </Text>
              <Text bold fit textFont="primary" textColor="secondary">
                changes
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
          "and depending on how these charts are layed out, we might have to write a bunch more css"
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

        <Slide transition={["none"]} notes={notes(
          "that's a lot of repetition. and a lot of context switching"
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
          "so overall the we've found the standard approach to be..."
        )}>
          <Heading fit size={3} textColor="secondary">
            Developer Experience
          </Heading>
          <List>
            <ListItem><Appear fid="1">Steep learning curve</Appear></ListItem>
            <ListItem><Appear fid="2">Lots of context switching</Appear></ListItem>
            <ListItem><Appear fid="3">Time consuming</Appear></ListItem>
            <ListItem><Appear fid="4">Still kind of fun</Appear></ListItem>
          </List>
        </Slide>

        <Slide transition={["fade"]} notes={notes(
          "I'd give it a B-, not so bad, but definitely room for improvement"
        )}>
          <Heading fit size={3} textColor="secondary">
            Developer Experience
          </Heading>
          <Text style={{fontSize: 248}} textColor="paleRed">
            B-
          </Text>
        </Slide>

        {/* ---------------------------------------------------------------
          * Background: React and Radium
          * --------------------------------------------------------------- */}

        <Slide transition={["none"]} notes={notes(
          "...and then about a year ago"
        )}>
          <Text textFont="primary" textColor="secondary">
            then all of a sudden...
          </Text>
          <Text bold fit caps textFont="primary" textColor="secondary">
            everyone
          </Text>
          <Text fit caps textFont="primary" textColor="secondary">
            decided to use
          </Text>
          <Text fit caps textFont="primary" textColor="secondary">
            react
          </Text>
        </Slide>

        <Slide transition={["none"]} notes={notes(
          "...and we really started think about how we were writing interfaces"
        )}>
          <Text bold fit caps textFont="primary" textColor="secondary">
            React
          </Text>
          <Text fit caps textFont="primary" textColor="secondary">
            Approach
          </Text>
        </Slide>

        <Slide transition={["fade"]} notes={notes(
          "by using jsx we immediately got to eliminate one of the pieces of the puzzle",
          "and we thought, we can take this one step further..."
        )}>
          <Layout>
              <div style={{"flex-basis": "30%", paddingTop: 80, marginRight: 20}}>
                <Text textFont="primary" textColor="secondary">
                  the
                </Text>
                <Text bold fit textFont="primary" textColor="secondary">
                  setup
                </Text>
              </div>
            <BarChartDiagram label={"spec"}/>
          </Layout>
          <Layout>
            <Appear fid="1">
            <Layout>
              <JsDiagram label=".jsx"/>
              <CssDiagram/>
              <Heading size={3} textColor="secondary">
                <i className="fa fa-arrow-right" style={{paddingTop: 125}}/>
              </Heading>
              <ContainerDiagram label={"result"}/>
            </Layout>
            </Appear>
          </Layout>
        </Slide>

        <Slide notes={notes(
          "so we built a tool called Radium",
          "a set of tools for managing inline styles in react",
          "in other words, we dont have to write css anymore"
        )}>
          <Text bold fit textFont="primary" textColor="paleRed">
            Radium
          </Text>
          <Appear fid="1">
            <Text textFont="primary" textColor="paleRed">
              this machine kills CSS
            </Text>
          </Appear>
        </Slide>

        <Slide transition={["fade"]} notes={notes(
          "and what we're left with is something really nice"
        )}>
          <Appear fid="1">
            <Text bold fit textFont="primary" textColor="secondary">
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
          <Heading fit size={3} textColor="secondary">
            self-contained components
          </Heading>
          <List>
            <ListItem><Appear fid="1">Modular</Appear></ListItem>
            <ListItem><Appear fid="2">Composable</Appear></ListItem>
            <ListItem><Appear fid="3">Logic <em>with</em> visual representation</Appear></ListItem>
          </List>
        </Slide>

        <Slide transition={["fade"]} notes={notes(
          "this combination of React and Radium sounds pretty ideal for data viz",
          "I guess now we just need to drop in d3"
        )}>
          <Text bold fit textFont="primary" textColor="secondary">
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
          "this combination of React and Radium sounds pretty ideal for data viz",
          "I guess now we just need to drop in d3"
        )}>
          <Text fit textFont="primary" textColor="secondary">
            Let's add <em>d3</em>
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
          "so just wrapping d3 in React was not a great solution",
          "because d3 and React have incompatible DOM models and methods for handling data"
        )}>
          <Heading fit caps size={3} textColor="paleRed">
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
          <Text bold  caps fit textFont="primary" textColor="secondary">
            This is a great idea
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
          <Text style={{fontSize: 65}} textFont="primary" textColor="secondary">
            what if we use
          </Text>
          <Text style={{fontSize: 200}} textFont="primary" textColor="secondary">
            React
          </Text>
          <Text style={{fontSize: 200}} textFont="primary" textColor="paleRed">
            Radium
          </Text>
          <Text fit textFont="primary" textColor="secondary">
            and just a little bit of d3
          </Text>
        </Slide>

        <Slide transition={["none"]} notes={notes(
          "what do I mean by just a little bit of d3",
          "Well we couldn't use any of the pieces that interacted with the DOM",
          "We also needed to avoid data mutation",
          "And we weren't really excited about keeping the api"
        )}>
          <Text fit textFont="primary" textColor="paleRed">
            just a little bit of d3
          </Text>
          <Appear>
            <Text bold fit textFont="primary" textColor="secondary"
              style={{textDecoration: "line-through", padding: 2}}>
              DOM Manipulation
            </Text>
          </Appear>
          <Appear>
            <Text bold fit textFont="primary" textColor="secondary"
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
          <Text fit textFont="primary" textColor="paleRed">
            just a little bit of d3
          </Text>
          <Text bold fit textFont="primary" textColor="secondary">
            {"Math"}
          </Text>
        </Slide>

        <Slide notes={notes(
          "so now the question becomes"
        )}>
          <Text style={{fontSize: 65}} textFont="primary" textColor="secondary">
            what can we build with
          </Text>
          <Text style={{fontSize: 180}} textFont="primary" textColor="secondary">
            React
          </Text>
          <Text style={{fontSize: 180}} textFont="primary" textColor="paleRed">
            Radium
          </Text>
          <Text fit textFont="primary" textColor="secondary">
            and math
          </Text>
        </Slide>

        <Slide notes={notes(
          "well, you could probably make anything"
        )}>
          <Text fit caps textFont="primary" textColor="secondary">
            probably
          </Text>
          <Text fit caps textFont="primary" textColor="secondary">
            anything
          </Text>
        </Slide>

        <Slide notes={notes(
          "but we had something a little more specific in mind"
        )}>
          <Text fit textFont="primary" textColor="secondary">
            anything
          </Text>
        </Slide>

        <Slide id="victory" transition={["fade"]} notes={notes(
          "so we decided to build victory"
        )}>
          <Text fit textFont="serif" textColor="secondary">
            Victory
          </Text>
        </Slide>

        <Slide id="victory-example" transition={["fade"]} notes={notes(
          "so we decided to build victory"
        )}>
          <Text fit textFont="serif" textColor="secondary">
            awesome example
          </Text>
        </Slide>





        <Slide transition={["fade"]} notes={notes(
          "so in summary"
        )}>
          <PlaygroundWrapper codeText={examples.chart1}/>
        </Slide>



      </CustomDeck>
    );
  }
}
