'use strict';

angular.module('myApp.commonService', ['ngRoute'])

.service('commonService', function() {

  var _boards = [];

  return {
      getBoards: function(){
          return _boards;
      },
      setBoards: function(value){
          _boards = value;
      }
  }
});