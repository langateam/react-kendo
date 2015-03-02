var React = require('react');

var KendoTemplate = function (component) {
  var container = $('<div />');
  React.render(component, container.get(0));
  return container.html();
};

module.exports = KendoTemplate;
