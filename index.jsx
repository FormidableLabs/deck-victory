/*global document*/

import React from "react";
import ReactDOM from "react-dom";
import context from "spectacle/src/utils/context";

import {Router, Route} from "react-router";

import createBrowserHistory from "history/lib/createBrowserHistory";
import createHashHistory from "history/lib/createHashHistory";

const history = process.env.NODE_ENV === "production" ?
  createHashHistory() :
  createBrowserHistory();

import Flux from "spectacle/src/flux/alt";
import Deck from "./presentation/deck";

// Configuration
import config from "spectacle/presentation/config";
config.theme = require("./themes/formidable/index");
config.print = require("./themes/formidable/print");
config.html = require("./themes/formidable/html");

// Styling
import "normalize.css";
import "./themes/formidable/index.css";

// Hack the favicon into the build directory.
// This _places_ it in build output.
// See: https://github.com/HenrikJoreteg/hjs-webpack/issues/24
import "file?name=favicon.ico!./assets/img/favicon.ico";
import "file?name=CNAME!./CNAME";

// Flux
const flux = new Flux();

// Presentation
class Presentation extends React.Component {
  render() {
    return <Deck />;
  }
}

Presentation.contextTypes = {
  router: React.PropTypes.object
};

const PresContext = context(Presentation, {
  styles: config.theme,
  print: config.print,
  flux
});

// Router
ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={PresContext} />
    <Route path="/:slide" component={PresContext} />
  </Router>
, document.body);
