/* globals SuperGif */
(function () {
	'use strict';

	/**
	 * Load a GIF file using `libgif-js`
	 */

	function loadgif() {

		return {
			restrict: 'A',
			scope: {},
			link: function (scope, element, attrs) {
				console.log(attrs);

				var gifObj = new SuperGif({
					gif: element[0]
				});

				gifObj.load(function () {
					scope.$emit('gif.ready', gifObj);
				});
			}
		};
	}

	angular.module('gifEditor')
		.directive('loadgif', loadgif);
}());
