(function () {
	'use strict';

	/**
	 * Main editor
	 */

	function EditorCtrl($log, $scope) {
		$log.debug('EditorCtrl');

		var self = this;

		self.framesData = [];

		/**
		 * Controls
		 */

		$scope.$on('gif.ready', function (e, gifObj) {
			self.pause = function () {
				gifObj.pause();
			};

			self.play = function () {
				gifObj.play();
			};

			self.restart = function () {
				gifObj.move_to(0);
			};

			self.stepPrev = function () {
				gifObj.move_relative(-1);
			};

			self.stepNext = function () {
				gifObj.move_relative(1);
			};

			$scope.$broadcast('gif.done', gifObj);
		});

		self.setFrame = function (inx) {
			console.log('message');
		};
	}

	angular.module('gifEditor')
		.controller('EditorCtrl', EditorCtrl);
}());
