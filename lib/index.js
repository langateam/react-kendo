var _ = require('lodash');
var React = require('react');
var KendoWidgetMixin = require('./KendoWidgetMixin');
var widgetMixins = require('./widgets');
var kendo = global.kendo;

if (!kendo || !kendo.ui) {
  throw new Error('kendo.ui not found');
}

function kendoWidgetName(name) {
  return 'kendo' + name;
}

function buildComponent (widget, name) {
  var mixins = [
    KendoWidgetMixin(kendoWidgetName(name))
  ];
  if (widgetMixins[name]) {
    mixins.push(widgetMixins[name]);
  }
  return React.createClass({
    mixins: mixins
  });
}

var KendoUi = _.mapValues(kendo.ui, buildComponent);
var KendoMobileUi = _.mapValues(kendo.mobile && kendo.mobile.ui, buildComponent);

module.exports = _.extend({
    Template: require('./KendoTemplate'),
    mobile: KendoMobileUi
  },
  KendoUi
);
