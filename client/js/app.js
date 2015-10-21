var liberatorApp = angular.module('liberatorApp', []);

//expects a variable to have been defined "shelves"

liberatorApp.controller('bookshelfCtrl', ['$scope', function ($scope) {
	
	$scope.shelves = shelves;

}]);