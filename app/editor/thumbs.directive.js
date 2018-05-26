(function () {
	'use strict';

	/**
	 * Load all GIF frames into thumbs
	 */

	function thumbs($compile) {

		return {
			restrict: 'E',
			scope: {
				framesData: '='
			},
			templateUrl: 'app/editor/thumbs.view.html',
			link: function (scope, element, attrs) {
				var thumbs = $('#thumbs');

				scope.setFrame = function (e) {
					var elm = e.currentTarget;
					var inx = $(elm).attr('index');

					scope.gifObj.move_to(inx);

					thumbs.find('.active').removeClass('active');
					thumbs.find('img').eq(inx).addClass('active');
				};

				scope.$on('gif.done', function (e, gifObj) {
					scope.gifObj = gifObj;

					var len = gifObj.get_length();
					var imgCanvas = gifObj.get_canvas();

					var thumbWidth = imgCanvas.width / 2;
					var thumbHeight = imgCanvas.height / 2;

					var framesData = scope.framesData;
					var dataURL;
					var frame = 0;

					// Set thumbs container width to fit all thumbs horizontally
					thumbs.css({
						width: thumbWidth * len,
						height: thumbHeight
					});

					// Populate all frames
					while (frame < len) {
						// Move to specific frame
						gifObj.move_to(frame);
						// Get image data
						dataURL = imgCanvas.toDataURL();

						// Add an <img> tag for that frame
						// Must $compile for the `ng-click` to work
						var imgElm = $compile($('<img />').attr({
							src: dataURL,
							width: thumbWidth,
							height: thumbHeight,
							index: frame,
							'ng-click': 'setFrame($event)'
						}))(scope);

						// Set first frame to be active
						if (frame === 0) {
							imgElm.addClass('active');
						}

						thumbs.append(imgElm);

						frame++;
					}

					scope.$apply();
				});
			}
		};
	}

	angular.module('gifEditor')
		.directive('thumbs', thumbs);
}());
