(function(window, angular, document) {
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
				function apply(color, level) {
               if (color) {
                  color = color.replace(' ', '');
                  window.rainbow = window.rainbow || {};
                  if (!window.rainbow[color]) {
                     var id = 'md-badge-' + Math.floor((Math.random() * 500) + 1);
                     window.rainbow[color] = id;
                     var style = document.createElement('style');
                     style.type = 'text/css';
                     if (level) {
                        level += '-';
                     }
                     style.innerText = ['.', id, ':after', '{', level, 'color:', color, '!important', '}'].join('');
                     document.head.insertBefore(style, document.head.firstChild);
                  }
               	element.addClass(window.rainbow[color]);
               }
				}
            apply(attributes.mdBadgeFill, 'background');
            apply(attributes.mdBadgeColor);
         },
      };
   }]);
})(window, window.angular, document);
