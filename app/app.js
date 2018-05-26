(function () {
	'use strict';

	var app = angular.module('gifEditor', ['ngRoute']);

	app.config(function ($routeProvider) {

		// Setup routes logic
		$routeProvider
			.when('/', {
				templateUrl: 'app/editor/editor.view.html',
				controller: 'EditorCtrl',
				controllerAs: 'editor'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
}());
