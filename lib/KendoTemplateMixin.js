var _ = require('lodash');
var React = require('react');

var TemplateMixin = {
  propTypes: {
    data: React.PropTypes.object
  },
  getData: function () {
    return this.props.data || { };
  }
};

module.exports = TemplateMixin;
