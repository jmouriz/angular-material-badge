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
            return '<div class="md-badge" ng-transclude></div>';
         }
      };
   }]);
   
   module.directive('mdBadge', ['$mdTheming', '$mdColors', function($mdTheming, $mdColors) {
      return {
         restrict: 'A',
         link: function(scope, element, attributes) {
            $mdTheming(element);
            //
            var parent = element.parent();
            var badge = document.createElement('div');
            var offset = attributes.mdBadgeOffset || 0;
            function style(where, color) {
               if (color) {
                  if (color.startsWith(':')) {
                     color = $mdColors.getThemeColor(color.substr(1));
                  }
                  badge.style[where] = color;
               }
            }
            badge.classList.add('md-badge');
            badge.style.position = 'absolute';
            badge.style.zIndex = '9999';
            document.body.appendChild(badge);
            scope.$watch(function() {
               return attributes.mdBadgeColor;
            }, function(value){
               style('color', value);
            });
            scope.$watch(function() {
               return attributes.mdBadgeFill;
            }, function(value){
               style('background-color', value);
            });
            scope.$watch(function() {
               return attributes.mdBadge;
            }, function(value){
               badge.textContent = value;
               badge.style.display = value ? 'initial' : 'none';
            });
            scope.$watch(function() {
               return {
                  top: element.prop('offsetTop'),
                  left: element.prop('offsetLeft'),
                  width: element.prop('offsetWidth'),
                  height: element.prop('offsetHeight')
               };
            }, function(value) {
               var top = parent.prop('offsetTop');
               var left = parent.prop('offsetLeft');
               if (top > value.top) {
                  value.top += top;
               }
               if (left > value.left) {
                  value.left += left;
               }
               badge.style.left = value.left + value.width - 10 - offset + 'px';
               badge.style.top = value.top + value.height - 10 - offset + 'px';
            }, true);
         },
      };
   }]);
})(window, window.angular, document);
