'use strict';

angular.module('myApp.viewCard', ['ngRoute'])

.controller('ViewCardCtrl', function($scope,cardData) {
  $scope.currentCardTitle = cardData.cardTitle;
  $scope.currentCardDescription = cardData.cardDescription;
});