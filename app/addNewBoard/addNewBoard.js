'use strict';

angular.module('myApp.addNewBoard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addNewBoard', {
    templateUrl: 'addNewBoard/addNewBoard.html',
    controller: 'AddNewBoardCtrl'
  });
}])

.controller('AddNewBoardCtrl', function($scope) {
  
});