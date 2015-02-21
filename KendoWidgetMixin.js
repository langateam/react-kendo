var React = require('react');
/**
 * Use for all Kendo objects that inherit from kendo.ui.Widget
 *
 * @param widget e.g. 'kendoGrid' for Grid
 */
var KendoWidgetMixin = function (widget) {
  return {

    getDefaultProps: function () {
      return {
        options: { },
        debug: false
      };
    },

    /**
     * Initialize Kendo component
     */
    componentDidMount: function () {
      if (this.props.debug) console.log('kendo widget mounted:', widget);
      this.props.$widget = $(this.getDOMNode())[widget](this.props.options).data(widget);

    },

    /**
     * Pass updated options into kendo widget
     */
    componentDidUpdate: function (prevProps, nextProps) {
      if (this.props.debug) console.log('kendo widget updated:', nextProps);

      if (nextProps.options) {
        this.props.$widget.setOptions(nextProps.options);
      }
    },

    /**
     * Destroy kendo widget
     */
    componentWillUnmount: function () {
      if (this.props.debug) console.log('kendo widget unmounted:', widget);
      this.props.$widget.destroy();
    },

    /**
     * Accessor function for the Kendo Widget object.
     */
    getWidget: function () {
      return this.props.$widget;
    },

    /**
     * Default Kendo widget renderer
     */
    render: function () {
      var other = _.omit(this.props, [ 'options', 'children' ]);
      return React.DOM.div(other, this.props.children);
    }
  };
};

module.exports = KendoWidgetMixin;
