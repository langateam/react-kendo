# react-kendo

[![npm version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]

React Component Library for Kendo UI Widgets. There exists a React Component
named for every Kendo widget in the
[kendo.ui](http://docs.telerik.com/kendo-ui/api/javascript/ui/ui) namespace.
Tested on React 0.12 and KendoUI 2014.3.1411.

## Install

```sh
$ npm install react-kendo --save
```

```html
  <script src="http://cdn.kendostatic.com/2014.3.1411/js/kendo.all.min.js"></script>
  <link href='http://cdn.kendostatic.com/2014.3.1411/styles/kendo.common.min.css' rel='stylesheet'>
  <!-- and so forth... -->
```

Please note: Kendo Professional Components require
[a License](http://www.telerik.com/purchase/kendo-ui).

## Usage
```js
var React = require('react');
React.Kendo = require('react-kendo');

/**
 * Instead of, e.g.
 * $('#my-splitter').kendoSplitter(splitterOptions);
 */
var splitterOptions = {
  orientation: 'horizontal',
  panes: [
    { collapsible: false, size: '300px' },
    { resizable: true }
  ]
};
var treeOptions = { /* ... */ };
var gridOptions = { /* ... */ };

var Workstation = React.createClass({
  render: function () {
    return (
      <React.Kendo.Splitter options={splitterOptions}>
        <React.Kendo.TreeView options={treeOptions} />
        <React.Kendo.Grid options={gridOptions} />
      </React.Kendo.Splitter>
    );
  }
});
```

## Properties

### `options`
The main Kendo options object that is sent into the constructor. e.g.
`$('#my-splitter').kendoSplitter(options);`

### `tag`
The `tag` property specifies the html tag that the Kendo widget will be bound
to. This is `div` by default, but can be set to
[any tag supported by React](http://facebook.github.io/react/docs/tags-and-attributes.html#html-elements).

### `reactive`
Version 0.13 and later support automatically re-initializing the Kendo Widget
when the `options` property is updated. This is useful for re-loading Grids
with new data, among other things. This is `false` by default.


## Additional Components

### `React.Kendo.Template`

A React Component that represents a [Kendo Template](http://docs.telerik.com/kendo-ui/framework/templates/overview).
Easily create a Kendo Template from a React Component. Additionally mixin
`React.Kendo.TemplateMixin`.

```js
var MyListItem = React.createClass({
  mixins: [
    React.Kendo.TemplateMixin
  ],
  render: function () {
    var item = this.props.item;
    return (
      <span>{item.title}</span>
    );
  }
});
var KendoList = React.createClass({
  render: function () {
    return (
      <React.Kendo.ListView options={
        template: function (item) {
          return React.Kendo.Template(<MyListItem item={item} />);
        }
      } />
    );
  }
});
```

### `React.Kendo.RowTemplate`

Use this component for Kendo Grid [Row
Templates](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-rowTemplate).

```js
var MyGridRow = React.createClass({
  mixins: [
    React.Kendo.TemplateMixin
  ],
  render: function () {
    var row = this.props.row;
    return (
      <span>{row.myField}</span>
    );
  }
});
var KendoList = React.createClass({
  render: function () {
    return (
      <React.Kendo.Grid options={
        template: function (row) {
          return React.Kendo.RowTemplate(<MyGridRow row={row} />);
        }
      } />
    );
  }
});
```

## License
MIT

[npm-image]: https://img.shields.io/npm/v/react-kendo.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-kendo
[travis-image]: https://img.shields.io/travis/tjwebb/react-kendo.svg?style=flat-square
[travis-url]: https://travis-ci.org/tjwebb/react-kendo
[daviddm-image]: http://img.shields.io/david/tjwebb/react-kendo.svg?style=flat-square
[daviddm-url]: https://david-dm.org/tjwebb/react-kendo
