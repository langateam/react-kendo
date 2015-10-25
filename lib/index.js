var _ = require('lodash');
var React = require('react');
var KendoWidgetMixin = require('./KendoWidgetMixin');
var widgetMixins = require('./widgets');
var kendo = global.kendo || require('kendo');

if (!kendo || !kendo.ui) {
  throw new Error('kendo.ui not found');
}

function kendoWidgetName(prefix, name) {
  return 'kendo' + prefix + name;
}

function buildComponent (widget, name, prefix) {
  var mixins = [
    KendoWidgetMixin(kendoWidgetName(prefix, name))
  ];
  if (widgetMixins[name]) {
    mixins.push(widgetMixins[name]);
  }
  return React.createClass({
    mixins: mixins
  });
}

var KendoUi = _.mapValues(kendo.ui, function (widget, name) {
  return buildComponent(widget, name, '');
});
var KendoMobileUi = _.mapValues(kendo.mobile && kendo.mobile.ui, function (widget, name) {
  return buildComponent(widget, name, 'Mobile');
});

module.exports = _.extend({
    Template: require('./KendoTemplate'),
    mobile: KendoMobileUi
  },
  KendoUi
);
