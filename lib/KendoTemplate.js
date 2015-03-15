var _ = require('lodash');
var React = require('react');

var KendoTemplate = function (component) {
  var id = _.uniqueId('react-kendo');
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
