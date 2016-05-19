var ReactDOMServer = require('react-dom/server');

var KendoTemplate = function (component) {
  return ReactDOMServer.renderToStaticMarkup(component);
};
KendoTemplate.wrap = function (component) {
  return function (props) {
    return KendoTemplate(component(props));
  };
};

module.exports = KendoTemplate;
