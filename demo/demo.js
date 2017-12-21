var demo = angular.module('Demo', ['ngMaterial', 'ngMdIcons', 'ngMdBadge', 'hc.marked']);

demo.config(['markedProvider', function(markedProvider) {
   markedProvider.setOptions({
      gfm: true,
      tables: true,
      highlight: function(code, language) {
         if (!language) {
            language = 'bash';
         } else if (language == 'html') {
            language = 'markup';
         }
         return Prism.highlight(code, Prism.languages[language]);
      }
   });
}]);

var themes = [{
      name: 'red',
      description: 'Red'
   }, {
      name: 'green',
      description: 'Green'
   }, {
      name: 'blue',
      description: 'Blue'
   }, {
      name: 'orange',
      description: 'Orange'
   }, {
      name: 'indigo',
      description: 'Indigo'
   }, {
      name: 'pink',
      description: 'Pink'
   }, {
      name: 'teal',
      description: 'Teal'
   }, {
      name: 'purple',
      description: 'Purple'
   }, {
      name: 'yellow',
      description: 'Yellow'
   }, {
      name: 'brown',
      description: 'Brown'
   }, {
      name: 'grey',
      description: 'Grey'
   }, {
      name: 'cyan',
      description: 'Cyan'
   }, {
      name: 'lime',
      description: 'Lime'
   }, {
      name: 'amber',
      description: 'Amber'
}];

demo.config(['$mdThemingProvider', function($mdThemingProvider) {
   $mdThemingProvider.theme('default').primaryPalette('purple').accentPalette('blue-grey').warnPalette('red');
   $mdThemingProvider.theme('blue').primaryPalette('blue').accentPalette('blue-grey').warnPalette('red');
   $mdThemingProvider.theme('red').primaryPalette('red').accentPalette('blue-grey').warnPalette('red');
   $mdThemingProvider.theme('green').primaryPalette('green').accentPalette('blue-grey').warnPalette('red');
   $mdThemingProvider.theme('pink').primaryPalette('pink').accentPalette('blue-grey').warnPalette('red');
   $mdThemingProvider.theme('orange').primaryPalette('orange').accentPalette('blue-grey').warnPalette('red');
   $mdThemingProvider.theme('indigo').primaryPalette('indigo').accentPalette('blue-grey').warnPalette('red');
   $mdThemingProvider.theme('teal').primaryPalette('teal').accentPalette('blue-grey').warnPalette('red');
   $mdThemingProvider.theme('purple').primaryPalette('purple').accentPalette('blue-grey').warnPalette('red');
   $mdThemingProvider.theme('yellow').primaryPalette('yellow').accentPalette('blue-grey').warnPalette('red');
   $mdThemingProvider.theme('grey').primaryPalette('grey').accentPalette('blue-grey').warnPalette('red');
   $mdThemingProvider.theme('cyan').primaryPalette('cyan').accentPalette('blue-grey').warnPalette('red');
   $mdThemingProvider.theme('brown').primaryPalette('brown').accentPalette('blue-grey').warnPalette('red');
   $mdThemingProvider.theme('lime').primaryPalette('lime').accentPalette('blue-grey').warnPalette('red');
   $mdThemingProvider.theme('amber').primaryPalette('amber').accentPalette('blue-grey').warnPalette('red');
   $mdThemingProvider.alwaysWatchTheme(true);
}]);

demo.controller('Demo', ['$scope', function($scope) {
   $scope.theme = 'red';
   $scope.themes = themes;
   $scope.show = true;
}]);
