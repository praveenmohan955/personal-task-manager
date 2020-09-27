'use strict';

angular.module('myApp.mainPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mainPage', {
    templateUrl: 'mainPage/mainPage.html',
    controller: 'MainPageCtrl'
  });
}])

.controller('MainPageCtrl', function($scope,$location,commonService,Popeye) {

  $scope.boards = [];

  $scope.$watch(function () { return commonService.getBoards(); }, function (newValue, oldValue) {
    if (newValue != null) {
        $scope.boards = newValue;
    }
  }, true);

  $scope.addNewBoard = function(){
    var modal = Popeye.openModal({
      templateUrl: "addNewBoard/addNewBoard.html",
      controller: "AddNewBoardCtrl as ctrl",
    });

    modal.closed.then(function(board) {
      if(board)
      {
        $scope.boards.push(board);
        commonService.setBoards($scope.boards);
      }
    });
  }

  $scope.redirectToBoard = function(boardName){
    $location.path('/boardView/'+boardName);
  }
});