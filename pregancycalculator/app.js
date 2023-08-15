//: \\srv-web-dev\e$\Web\IUDCalc
//Module Rules and controller
//var comp = angular.module('app', []);
// https://www.codeproject.com/Articles/862602/Define-Multiple-Angular-Apps-In-One-Page
//!!Your going to have to redo the hide and show on the condition hours!!
//Round up or Down
//https://stackoverflow.com/questions/17691202/round-up-round-down-a-momentjs-moment-to-nearest-minute

//secondApp gets injected into rootApp <body ng-app='rootApp'> scope

//Make Structure Diagram

var rootApp = angular.module('rootApp', ['firstApp']);

var firstApp = angular.module('firstApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

rootApp.controller('rootCon', ['$scope', function($scope) {


}]);

firstApp.factory('Data', function () {

  var data = {
      DateExpected: ''
  };

  return {
      getDateExpected: function () {
          return data.DateExpected;
      },
      setDateExpected: function (dateExpected) {
          data.DateExpected = dateExpected;
      }
  };
});




firstApp.controller('resultController', function ($scope, Data) {

  // $scope.$watch(function () { return Data.getDateExpected(); }, function (newValue, oldValue) {
  //     if (newValue !== oldValue) $scope.dateExpected = newValue;
  // });
});