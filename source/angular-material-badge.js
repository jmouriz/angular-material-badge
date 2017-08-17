(function(window, angular, undefined) {
   'use strict';
   
   angular.module('ngMdBadge', ['ngMaterial']).directive('mdBadge', ['$mdTheming', function($mdTheming) {
      return {
         restrict: 'E',
         replace: true,
         transclude: true,
         link: function(scope, element, attributes) {
            $mdTheming(element);
         },
         template: function(element, attributes) {
            console.log('template');
            return '<div class="md-badge" ng-transclude></div>';
         }
      };
   }]);
})(window, window.angular, undefined);
