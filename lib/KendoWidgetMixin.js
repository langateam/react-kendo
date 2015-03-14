var React = require('react');
var _ = require('lodash');
var reactTags = _.keys(React.DOM);

/**
 * Use for all Kendo objects that inherit from kendo.ui.Widget
 *
 * @param widget e.g. 'kendoGrid' for Grid
 */
var KendoWidgetMixin = function (widget) {
  return {

    propTypes: {
      options: React.PropTypes.object,
      debug: React.PropTypes.bool,
      tag: React.PropTypes.oneOf(reactTags).isRequired
    },

    getDefaultProps: function () {
      return {
        options: { },
        debug: false,
        tag: 'div'
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

      if (nextProps && nextProps.options) {
        this.props.$widget.setOptions(nextProps.options);
      }
    },

    /**
     * Destroy kendo widget
     */
    componentWillUnmount: function () {
      if (this.props.debug) console.log('kendo widget unmounted:', widget);
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
      var other = _.omit(this.props, [ 'options', 'children', 'tag' ]);
      return React.DOM[this.props.tag](other, this.props.children);
    }
  };
};

module.exports = KendoWidgetMixin;
