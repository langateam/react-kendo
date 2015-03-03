var React = require('react');
var cloneWithProps = require('react/lib/cloneWithProps');

var KendoRowTemplate = function (component) {
  var container = document.createElement('tbody');
  React.render(cloneWithProps(component), container);
  return $(container).html();
};

module.exports = KendoRowTemplate;
