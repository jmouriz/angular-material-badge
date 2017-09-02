(function(window, angular, undefined) {
   'use strict';
   
   var module = angular.module('ngMdBadge', ['ngMaterial']);

   module.directive('mdBadge', ['$mdTheming', function($mdTheming) {
      return {
         restrict: 'E',
         replace: true,
         transclude: true,
         link: function(scope, element, attributes) {
            $mdTheming(element);
         },
         template: function(element, attributes) {
            return '<div class="md-badge-alone" ng-transclude></div>';
         }
      };
   }]);
   
   module.directive('mdBadge', ['$mdTheming', function($mdTheming) {
      return {
         restrict: 'A',
         link: function(scope, element, attributes) {
            $mdTheming(element);
            element.addClass('md-badge');
         },
      };
   }]);
})(window, window.angular, undefined);
