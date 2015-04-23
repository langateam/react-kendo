var _ = require('lodash');
var React = require('react');
var reactTags = _.keys(React.DOM);
var renderInterval = 50; // ms
var renderTimeout = 2000; // ms

var KendoTemplate = function (component, tag) {
  //var container = $('<div />');
  return React.renderToStaticMarkup(component);//, container.get(0));
  //return container.html();

  /*
  var id = _.uniqueId('react-kendo-');
  var html = '<span id="'+ id + '"></span>';
  var counter = 0;
  var interval = null;

  function resolveInterval () {
    counter = null;
    html = null;
    id = null;
    clearInterval(interval);
  }

  interval = setInterval(function kendoTemplateRendererInterval () {
    if ((++counter * renderInterval) > renderTimeout) {
      if (global.__debug) {
        console.warn('element was never mounted onto the DOM [id=', id, ']. timeout=', renderTimeout, 'ms; bailing out');
        resolveInterval();
      }
    }
    var container = document.getElementById(id);
    if (!container) return;

    resolveInterval();
    React.render(component, container);
  }, renderInterval);

  return html;
  */
};

module.exports = KendoTemplate;
