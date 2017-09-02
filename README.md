# angular-material-badge

Material Badge for AngularJS

## Demo

View [online demo](https://jmouriz.github.io/angular-material-badge/demo/demo.html)

## Install

Download the package:

```
yarn add angular-material-badge
```

## Usage

In your document head, include:

```html
<link rel="stylesheet" href="node_modules/angular-material-badge/angular-material-badge.min.css" />
```

Use the md-badge where you wish:

```html
<md-badge>12</md-badge>

<ng-md-icon md-badge="12" icon="notifications"></ng-md-icon>
```

Then, just before close body tag, include:

```html
<script src="node_modules/angular-material-badge/angular-material-badge.min.js"></script>
```

Include the module in your application:

```javascript
var application = angular.module('Application', ['ngMdBadge']);
```
