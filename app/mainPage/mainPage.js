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
        //update Controller2's xxx value
        console.log(newValue);
        $scope.boards = newValue;
    }
  }, true);

  $scope.addNewBoard = function(){
    console.log("Inside add new board");

    //$location.path('/boardView');

    //Open a modal to show the selected user profile
    var modal = Popeye.openModal({
      templateUrl: "addNewBoard/addNewBoard.html",
      controller: "AddNewBoardCtrl as ctrl",
    });

    // Show a spinner while modal is resolving dependencies
    // $scope.showLoading = true;
    // modal.resolved.then(function() {
    //   $scope.showLoading = false;
    //   console.log("Inside resolved");
    // });

    // Update user after modal is closed
    modal.closed.then(function(board) {
      // $scope.updateUser();
      console.log("Inside closed");
      console.log(board);
      if(board)
      {
        //$scope.boards.push({"name": board.boardName, "description": board.boardDescription});
        $scope.boards.push(board);
        commonService.setBoards($scope.boards);
        console.log($scope.boards); 
      }
    });
  }

  $scope.redirectToBoard = function(boardName){
    console.log("Inside the board");
    console.log(boardName);
    $location.path('/boardView/'+boardName);
  }
});