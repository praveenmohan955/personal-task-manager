'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.mainPage',
  'myApp.boardView',
  'myApp.addNewBoard',
  'myApp.viewCard',
  'myApp.version',
  'myApp.commonService',
  'pathgather.popeye'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/mainPage'});
}]);
