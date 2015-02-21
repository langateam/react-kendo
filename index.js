var _ = require('lodash');
var KendoWidgetMixin = require('./KendoWidgetMixin');

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
