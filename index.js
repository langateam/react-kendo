var _ = require('lodash');
var React = require('react');
var KendoWidgetMixin = require('./KendoWidgetMixin');
var kendo = global.kendo;

if (!kendo || !kendo.ui) {
  throw new Error('kendo.ui not found');
}

function kendoWidgetName(name) {
  return 'kendo' + name;
}

var KendoWidgets = _.mapValues(kendo.ui, function (widget, name) {
  return React.createClass({
    mixins: [
      KendoWidgetMixin(kendoWidgetName(name))
    ]
  });
});

module.exports = KendoWidgets;
