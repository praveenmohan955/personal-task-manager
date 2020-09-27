'use strict';

describe('myApp.mainPage module', function() {

  beforeEach(module('myApp.mainPage'));

  describe('mainPage controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var mainPageCtrl = $controller('MainPageCtrl');
      expect(mainPageCtrl).toBeDefined();
    }));

  });
});