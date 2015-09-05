(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ReactKendo = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var _ = (window._);
var React = (window.React);

var KendoTemplate = function (component) {
  return React.renderToStaticMarkup(component);
};

module.exports = KendoTemplate;

},{}],2:[function(require,module,exports){
/* global kendo */

var React = (window.React);
var _ = (window._);
var reactTags = _.keys(React.DOM);

function mountKendoWidget (component, widget) {
  component.$elem[widget](component.props.options);
  return component.$elem.data(widget);
}

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
        reactive: false,
        tag: 'div'
      };
    },

    componentWillMount: function () {
      if (this.props.debug) console.log('willMount kendo widget', widget, '...');
    },

    /**
     * Initialize Kendo component
     */
    componentDidMount: function () {
      if (this.props.debug) console.log('kendo widget mounting... ', widget);

      this.elem = React.findDOMNode(this);
      this.$elem = $(this.elem);
      this.$widget = mountKendoWidget(this, widget);

      if (this.props.debug) console.log('kendo widget mounted:', widget, ', widget=', this.$widget);
      if (this.props.debug) console.log('elem=', this.elem);
      if (this.props.debug) console.log('$elem=', this.$elem);
    },

    componentWillUpdate: function () {
      if (this.props.debug) console.log('willUpdate kendo widget', widget, '...');
    },

    /**
     * Pass updated options into kendo widget
     */
    componentDidUpdate: function () {
      if (this.props.debug) console.log('didUpdate kendo widget', widget);
      if (this.props.debug) console.log('new options:', this.props.options);

      if (!this.props.reactive) return;

      if (this.props.debug) console.log('[', widget, '] refreshing "reactive" widget...');

      this.$widget.unbind();
      if (this.$widget.element) {
        kendo.destroy(this.$widget);
      }
      if (this.$widget.dataSource) {
        this.$widget.dataSource.unbind('change', this.$widget._refreshHandler);
        this.$widget.dataSource.unbind('error', this.$widget._errorHandler);
      }

      this.$elem.empty();
      this.$widget = mountKendoWidget(this, widget);
    },

    /**
     * Destroy kendo widget
     */
    componentWillUnmount: function () {
      if (this.props.debug) console.log('unmounting kendo widget', widget, '...');

      this.$widget.unbind();
      if (this.$widget.element) {
        kendo.destroy(this.$widget);
      }

      if (this.$widget.dataSource) {
        this.$widget.dataSource.unbind('change', this.$widget._refreshHandler);
        this.$widget.dataSource.unbind('error', this.$widget._errorHandler);
      }

      if (this.props.debug) console.log('kendo widget unmounted:', widget);
    },

    /**
     * Accessor function for the Kendo Widget object.
     */
    getWidget: function () {
      return this.$widget;
    },

    getElement: function () {
      return this.$elem;
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

},{}],3:[function(require,module,exports){
(function (global){
var _ = (window._);
var React = (window.React);
var KendoWidgetMixin = require('./KendoWidgetMixin');
var widgetMixins = require('./widgets');
var kendo = global.kendo;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./KendoTemplate":1,"./KendoWidgetMixin":2,"./widgets":5}],4:[function(require,module,exports){
/* global kendo */

var React = (window.React);
var _ = (window._);

var Grid = {
  /**
   * @param group draggable group
   * @param options
   */
  enableDraggableRows: function (group, options) { 
    this.getWidget().table.kendoDraggable(_.defaults(options || { }, {
      filter: 'tbody > tr',
      group: group,
      cursorOffset: {
        top: 0,
        left: 0
      },  
      hint: function (e) {
        // XXX clean up
        return $('<div class="k-grid k-widget"><table><tbody><tr>' + e.html() + '</tr></tbody></table></div>');
      },
      dragend: function (e) {
        if (e.sender.dropped) {
          this.enableDraggableRows(group, options);
        }
      }.bind(this)
    }));
  }
};

module.exports = Grid;

},{}],5:[function(require,module,exports){
module.exports = {
  Grid: require('./Grid')
};

},{"./Grid":4}]},{},[3])(3)
});