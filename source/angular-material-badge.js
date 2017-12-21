/* onDOMChange: https://stackoverflow.com/a/3219767/1804902 */
(function (window) {
   'use strict';

	var last = +new Date();
   var delay = 100;
   var stack = [];

	function callback() {
		var now = +new Date();
      if (now - last > delay) {
      	for (var i = 0; i < stack.length; i++) {
         	stack[i]();
         }
      	last = now;
      }
   }

	var onDOMChange = function(handler, _delay) {
   	if (_delay) {
			delay = _delay;
		}
      stack.push(handler);
   };

	function native() {
		var last = document.getElementsByTagName('*');
      var _length = last.length;
      var timer = setTimeout(function check() {
			var current = document.getElementsByTagName('*');
			var length = current.length;

         if (length != _length) {
         	last = [];
         }

         for (var i = 0; i < length; i++) {
         	if (current[i] !== last[i]) {
            	callback();
               last = current;
               _length = length;
               break;
            }
         }

         setTimeout(check, delay);
		}, delay);
	}

   var support = {};
   var element = document.documentElement;
   var remain = 3;

   function decide() {
		if (support.DOMNodeInserted) {
			window.addEventListener('DOMContentLoaded', function() {
				if (support.DOMSubtreeModified) {
					element.addEventListener('DOMSubtreeModified', callback, false);
				} else {
            	element.addEventListener('DOMNodeInserted', callback, false);
               element.addEventListener('DOMNodeRemoved', callback, false);
            }
        	}, false);
		} else if (document.onpropertychange) {
			document.onpropertychange = callback;
		} else {
			native();
		}
	}

	function test(event) {
		element.addEventListener(event, function handler() {
	      support[event] = true;
	      element.removeEventListener(event, handler, false);
	      if (--remain === 0) {
				decide();
			}
      }, false);
	}

	if (window.addEventListener) {
		test('DOMSubtreeModified');
		test('DOMNodeInserted');
      test('DOMNodeRemoved');
	} else {
		decide();
   }

	/*
	var dummy = document.createElement('div');
   element.appendChild(dummy);
   element.removeChild(dummy);
	*/

	window.onDOMChange = onDOMChange;
})(window);

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
   
   module.directive('mdBadge', ['$mdTheming', '$mdColors', '$timeout', '$window', function($mdTheming, $mdColors, $timeout, $window) {
      return {
         restrict: 'A',
         link: function(scope, element, attributes) {
            $mdTheming(element);
            //
            var parent = element.parent();
            var badge = document.createElement('div');
            var offset = parseInt(attributes.mdBadgeOffset);
            if (isNaN(offset)) {
               offset = 10;
            }
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
            parent.append(badge);
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
            var position = function(value) {
					var top = element.prop('offsetTop');
               badge.style.display = attributes.mdBadge && top ? 'initial' : 'none';
               badge.style.left = value.left + value.width - 20 + offset + 'px';
               badge.style.top = value.top + value.height - 20 + offset + 'px';
            };
            scope.$watch(function() {
               return {
                  top: element.prop('offsetTop'),
                  left: element.prop('offsetLeft'),
                  width: element.prop('offsetWidth'),
                  height: element.prop('offsetHeight')
               };
            }, function(value) {
               position(value);
            }, true);
            $timeout(function() {
               scope.$digest();
            });
				var update = function() {
               position({
                  top: element.prop('offsetTop'),
                  left: element.prop('offsetLeft'),
                  width: element.prop('offsetWidth'),
                  height: element.prop('offsetHeight')
               });
				};
            angular.element($window).bind('resize', function(){
					update();
            });
				onDOMChange(function() { 
					update();
				});
         },
      };
   }]);
})(window, window.angular, document);
