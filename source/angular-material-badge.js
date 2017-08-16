//.md-button.md-xxx-theme.md-primary.md-fab,
//.md-button.md-xxx-theme.md-primary.md-raised

var $debug;

(function(window, angular, undefined) {
   'use strict';
   
   angular.module('ngMdBadge', ['ngMaterial']).directive('mdBadge', ['$mdTheming', function($mdTheming) {
      var reference = document.createElement('md-toolbar');
      reference.style.display = 'none';
      document.body.appendChild(reference);
      return {
         restrict: 'E',
         replace: true,
         transclude: true,
         link: function(scope, element, attributes) {
            $mdTheming(element);
            if (element[0].classList.contains('md-primary')) {
               var background = function() {
                  return (window.getComputedStyle && window.getComputedStyle(reference).backgroundColor) || element[0].style.backgroundColor;
               };
               scope.$watch(function() {
                  return background();
               },
               function (current, previous) {
                  if (current !== previous) {
                     element[0].style.backgroundColor = current;
                     element[0].style.borderColor = current;
                  }
               });
               var color = background();
               element[0].style.backgroundColor = color;
               element[0].style.borderColor = color;
            }
         },
         template: function(element, attributes) {
            console.log('template');
            return '<div class="md-badge md-pink-theme" ng-transclude></div>';
         }
      };
   }]);
})(window, window.angular, undefined);
