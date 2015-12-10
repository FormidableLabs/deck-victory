/*eslint-disable max-len, indent*/
module.exports = function (data) {

  // **HACK**: `hjs-webpack` gets all messed up with this stuff. Infer `.css` if have .`js`
  // https://github.com/ryan-roemer/surge2015/issues/19
  const css = (data.main && data.isDev === false) ?
    data.main.replace(/\.js$/, ".css") :
    null;

  const html = [
    "<!doctype html>",
      "<html>",
        "<head>",
          "<meta charset=\"utf-8\"/>",
          "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, user-scalable=no\"/>",
          "<link href='https://fonts.googleapis.com/css?family=Karla:400,700,400italic' rel='stylesheet' type='text/css'>",
          ((css && /\.css$/.test(css)) ? "<link href=\"" + css + "\" rel=\"stylesheet\" type=\"text/css\" />" : ""),
          "<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css\">",
          "<link rel=\"stylesheet\" href=\"//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.css\"/>",
          "<link rel=\"stylesheet\" href=\"//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/theme/elegant.min.css\"/>",
          "<link rel=\"stylesheet\" href=\"//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/theme/monokai.min.css\"/>",
        "</head>",
        "<body>",
          "<script type=\"text/javascript\" src=\"//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.js\"></script>",
          "<script type=\"text/javascript\" src=\"//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/mode/javascript/javascript.min.js\"></script>",
          "<div id=\"root\"></div>",
          (data.main ? "<script src=\"" + data.main + "\"></script>" : ""),
        "</body>",
      "</html>"
  ].join("");

  return {
    "200.html": html,
    "index.html": html
  };
};
