var _ = require('lodash');
var React = require('react');
var fnv = require('fnv-plus');

var KendoTemplate = function (component) {
  var componentString = React.renderToString(component);
  var id = 'react-kendo-' + fnv.hash(componentString).str();
  var html = '<div id="'+ id + '">' + componentString + '</div>';

  var interval = setInterval(function () {
    var container = document.getElementById(id);
    if (container === null) return;

    clearInterval(interval);
    React.render(component, container);
  }, 10);

  return html;
};

module.exports = KendoTemplate;
