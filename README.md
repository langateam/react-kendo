# react-kendo-ui

[![npm version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]

React Component Library for Kendo UI Widgets. There exists a React Component
named for every Kendo widget in the
[kendo.ui](http://docs.telerik.com/kendo-ui/api/javascript/ui/ui) namespace.

## Install

```sh
$ npm install react-kendo-ui
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

## License
MIT

[npm-image]: https://img.shields.io/npm/v/react-kendo-ui.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-kendo-ui
[travis-image]: https://img.shields.io/travis/tjwebb/react-kendo-ui.svg?style=flat-square
[travis-url]: https://travis-ci.org/tjwebb/react-kendo-ui
[daviddm-image]: http://img.shields.io/david/tjwebb/react-kendo-ui.svg?style=flat-square
[daviddm-url]: https://david-dm.org/tjwebb/react-kendo-ui
