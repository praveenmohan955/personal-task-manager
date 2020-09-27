'use strict';

angular.module('myApp.viewCard', ['ngRoute'])

.controller('ViewCardCtrl', function($scope,cardData) {
  console.log("Inside view card controller");
  console.log(cardData);
  $scope.currentCardTitle = cardData.cardTitle;
  $scope.currentCardDescription = cardData.cardDescription;
});