'use strict';

angular.module('myApp.boardView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/boardView/:boardName', {
    templateUrl: 'boardView/boardView.html',
    controller: 'BoardViewCtrl'
  });
}])

.controller('BoardViewCtrl', function($scope,$routeParams,Popeye,commonService) {
  $scope.boardTitle = $routeParams.boardName;
  $scope.boardData = commonService.getBoards();
    for(var boardList = 0; boardList< $scope.boardData.length; boardList++)
    {
        if($scope.boardData[boardList].boardName === $scope.boardTitle)
        {
            $scope.indexOfBoard = boardList;
            if(!$scope.boardData[boardList].lists)
            $scope.boardData[boardList].lists = {};
        }
    }
  $scope.allowDrop = function(ev) {
    ev.preventDefault();
  }

  $scope.dragStart = function(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
  }
  
  $scope.dropIt = function(ev) {
    ev.preventDefault();
    let sourceId = ev.dataTransfer.getData("text/plain");
    let sourceIdEl=document.getElementById(sourceId);
    let sourceIdParentEl=sourceIdEl.parentElement;
    // ev.target.id here is the id of target Object of the drop
    let targetEl=document.getElementById(ev.target.id)
    let targetParentEl=targetEl.parentElement;
  
    // Compare List names to see if we are going between lists
    // or within the same list
    if (targetParentEl.id!==sourceIdParentEl.id){
        if (targetEl.className === sourceIdEl.className ){
           targetParentEl.appendChild(sourceIdEl);
        }else{
             targetEl.appendChild(sourceIdEl);
        }
       
    }else{
        let holder=targetEl;
        let holderText=holder.textContent;
        targetEl.textContent=sourceIdEl.textContent;
        sourceIdEl.textContent=holderText;
        holderText='';
}
    
  }

  $scope.addNewList = function()
    {
        var modal = Popeye.openModal({
            templateUrl: "addNewList/addNewList.html",
            controller: "BoardViewCtrl as ctrl",
        });

        modal.closed.then(function(listName) {
            if(listName)
            {
                if(!$scope.boardData[$scope.indexOfBoard].lists[listName])
                $scope.boardData[$scope.indexOfBoard].lists[listName] = [];
                commonService.setBoards($scope.boardData);
            }
        });
    }

    $scope.addNewCard = function(listKey){
        var modal = Popeye.openModal({
            templateUrl: "addNewCard/addNewCard.html",
            controller: "BoardViewCtrl as ctrl",
        });

        modal.closed.then(function(cardDetails) {
            if(cardDetails)
            {
                $scope.boardData[$scope.indexOfBoard].lists[listKey].push(cardDetails);
                commonService.setBoards($scope.boardData);
            }
        });
    }

    $scope.viewCard = function(cardKey){
        var modal = Popeye.openModal({
            templateUrl: "viewCard/viewCard.html",
            controller: "ViewCardCtrl as ctrl",
            resolve: {
                cardData: () => cardKey
            }
        });

        modal.closed.then(function(cardDetails) {
            if(cardDetails)
            {
                $scope.boardData.forEach(element => {
                    for (const key in element.lists) {
                        if (element.lists.hasOwnProperty(key)) {
                            element.lists[key].forEach(card => {
                                if(card.cardTitle === cardDetails.currentCardTitle && card.cardDescription === cardDetails.currentCardDescription)
                                {
                                        var index = element.lists[key].indexOf(card);
                                        element.lists[key].splice(index, 1);
                                }
                            });
                        }
                    }
                });
            }
        });
    }

    $scope.deleteList = function(deleteObject){
        $scope.boardData.forEach(element => {
            for (const key in element.lists) {
                if (element.lists.hasOwnProperty(key)) {
                    if(deleteObject === key)
                    delete element.lists[key];
                }
            }
        });
    }
});