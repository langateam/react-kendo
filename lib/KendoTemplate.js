var _ = require('lodash');
var React = require('react');
var fnv = require('fnv-plus');

var KendoTemplate = function (component) {
  var id = _.uniqueId('react-kendo');
  //var componentString = React.renderToString(component);
  //var id = 'react-kendo-' + fnv.hash(componentString).str();
  var html = '<div id="'+ id + '"></div>';

  var interval = setInterval(function () {
    var container = document.getElementById(id);
    if (container === null) return;

    clearInterval(interval);
    //container.removeAttribute('id');
    React.render(component, container);
  }, 10);

  return html;
};

module.exports = KendoTemplate;
