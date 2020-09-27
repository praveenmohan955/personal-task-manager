'use strict';

angular.module('myApp.boardView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/boardView/:boardName', {
    templateUrl: 'boardView/boardView.html',
    controller: 'BoardViewCtrl'
  });
}])

.controller('BoardViewCtrl', function($scope,$routeParams,Popeye,commonService) {

  console.log($routeParams.boardName);
  $scope.boardTitle = $routeParams.boardName;
  $scope.boardData = commonService.getBoards();
  //console.log($scope.boardData);
    for(var boardList = 0; boardList< $scope.boardData.length; boardList++)
    {
        if($scope.boardData[boardList].boardName === $scope.boardTitle)
        {
            $scope.indexOfBoard = boardList;
            if(!$scope.boardData[boardList].lists)
            $scope.boardData[boardList].lists = {};
        }
    }
    console.log($scope.boardData);

  $scope.allowDrop = function(ev) {
    ev.preventDefault();  // default is not to allow drop
  }

  $scope.dragStart = function(ev) {
    // The 'text/plain' is referring the Data Type (DOMString) 
    // of the Object being dragged.
    // ev.target.id is the id of the Object being dragged
    ev.dataTransfer.setData("text/plain", ev.target.id);
  }
  
  $scope.dropIt = function(ev) {
    ev.preventDefault();  // default is not to allow drop
    let sourceId = ev.dataTransfer.getData("text/plain");
    let sourceIdEl=document.getElementById(sourceId);
    let sourceIdParentEl=sourceIdEl.parentElement;
    console.log(sourceIdParentEl);
    // ev.target.id here is the id of target Object of the drop
    console.log(ev);
    let targetEl=document.getElementById(ev.target.id)
    let targetParentEl=targetEl.parentElement;
  
    // Compare List names to see if we are going between lists
    // or within the same list
    console.log(targetParentEl.id);
    console.log(sourceIdParentEl.id);
    if (targetParentEl.id!==sourceIdParentEl.id){
// If the source and destination have the same 
        // className (card), then we risk dropping a Card in to a Card
        // That may be a cool feature, but not for us!
        console.log(targetEl.className);
        console.log(sourceIdEl.className);
        if (targetEl.className === sourceIdEl.className ){
          // Append to parent Object (list), not to a 
          // Card in the list
          // This is in case you drag and drop a Card on top 
          // of a Card in a different list
           targetParentEl.appendChild(sourceIdEl);
         
        }else{
            // Append to the list
             targetEl.appendChild(sourceIdEl);
           
        }
       
    }else{
        // Same list. Swap the text of the two cards
        // Just like swapping the values in two variables
      
        // Temporary holder of the destination Object
        let holder=targetEl;
        // The text of the destination Object. 
        // We are really just moving the text, not the Card
        let holderText=holder.textContent;
        // Replace the destination Objects text with the sources text
        targetEl.textContent=sourceIdEl.textContent;
        // Replace the sources text with the original destinations
        sourceIdEl.textContent=holderText;
        holderText='';
}
    
  }

  $scope.addNewList = function()
    {
        console.log("Inside add new board");

        //$location.path('/boardView');

        //Open a modal to show the selected user profile
        var modal = Popeye.openModal({
            templateUrl: "addNewList/addNewList.html",
            controller: "BoardViewCtrl as ctrl",
        });

        // Update user after modal is closed
        modal.closed.then(function(listName) {
            // $scope.updateUser();
            console.log("Inside closed");
            console.log(listName);
            if(listName)
            {
                //$scope.boards.push({"name": board.boardName, "description": board.boardDescription});
                if(!$scope.boardData[$scope.indexOfBoard].lists[listName])
                $scope.boardData[$scope.indexOfBoard].lists[listName] = [];
                commonService.setBoards($scope.boardData);
                console.log($scope.boardData);
            }
        });
    }

    $scope.addNewCard = function(listKey){
        console.log("Inside add new card");
        console.log(listKey);
        var modal = Popeye.openModal({
            templateUrl: "addNewCard/addNewCard.html",
            controller: "BoardViewCtrl as ctrl",
        });

        // Update user after modal is closed
        modal.closed.then(function(cardDetails) {
            // $scope.updateUser();
            console.log("Inside closed");
            console.log(cardDetails);
            if(cardDetails)
            {
                $scope.boardData[$scope.indexOfBoard].lists[listKey].push(cardDetails);
                commonService.setBoards($scope.boardData);
                console.log($scope.boardData);
            }
        });
    }

    $scope.viewCard = function(cardKey){
        console.log("Inside view card");
        console.log(cardKey);
        var modal = Popeye.openModal({
            templateUrl: "viewCard/viewCard.html",
            controller: "ViewCardCtrl as ctrl",
            resolve: {
                cardData: () => cardKey
            }
        });

        // // Update user after modal is closed
        modal.closed.then(function(cardDetails) {
            // $scope.updateUser();
            console.log("Inside delete");
            console.log(cardDetails);
            if(cardDetails)
            {
                // $scope.boardData[$scope.indexOfBoard].lists[listKey].push(cardDetails);
                // commonService.setBoards($scope.boardData);
                console.log($scope.boardData);
                $scope.boardData.forEach(element => {
                    for (const key in element.lists) {
                        if (element.lists.hasOwnProperty(key)) {
                            element.lists[key].forEach(card => {
                                if(card.cardTitle === cardDetails.currentCardTitle && card.cardDescription === cardDetails.currentCardDescription)
                                {
                                        var index = element.lists[key].indexOf(card);
                                        console.log(index);
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