var _ = require('lodash');
var React = require('react');
var fnv = require('fnv-plus');

var KendoTemplate = function (component) {
  var id = _.uniqueId('react-kendo');
  var html = '<span id="'+ id + '"></span>';

  var interval = setInterval(function () {
    var container = document.getElementById(id);
    if (container === null) return;

    clearInterval(interval);
    React.render(component, container);
  }, 10);

  return html;
};

module.exports = KendoTemplate;
