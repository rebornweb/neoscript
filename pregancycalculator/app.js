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


//UPSI controller
firstApp.controller('timeController', ['$scope', function($scope) {

  $scope.today = new Date();
  $scope.hour = {value:null};
  $scope.answer = 'Higher';
  $scope.added = new Date();
  $scope.showElement = 'false';
  $scope.displayDate = ''; // Initialize the displayDate model

  //https://stackoverflow.com/questions/1050720/adding-hours-to-javascript-date-object

$scope.shouldBeOpen = false;

$scope.addhours = function (){

  var hourV = $scope.hour.value;
        Date.prototype.addHours= function(h){
            this.setHours(this.getHours()-h);
            return this;
        };

  $scope.addedHours = new Date().addHours(hourV);
        console.log('Oh yeah we flying ' + new Date().addHours(hourV));

//Once addHours clicked change shouldBeOpen boolean
//Past date now appears
$scope.shouldBeOpen = true;

};


  const dateFormat = 'dddd, MMMM Do YYYY, h:mm:ss a';
  const input = $('.form-control');
  const hourRes = $('.hourRes');
  const prangeC = $('#prangeC');
  const DateChosen = $('.DateChosen');
  const momentStandard = moment(DateChosen, dateFormat);
  const dateMessage38 = 'For Conception - 38 Weeks ahead: ' + momentStandard.add(38, 'weeks').format(dateFormat);
 console.log("Date: chosen " +input)

  hourRes.hide();
  prangeC.hide();

  function formatDate(date) {
    return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
  }
  function updateDate() {
    const dateStr = input.val();
    const now = moment(new Date());
    const chosenDate = moment(dateStr, dateFormat);
    const upsiDate = moment(dateStr, dateFormat);
    const lmpDate = moment(dateStr, dateFormat);
  
    const hours = 'Hours ago: ' + now.diff(chosenDate, 'hours');
    const days = 'Days ago: ' + now.diff(chosenDate, 'days');
    const weeks = 'Weeks ago: ' + now.diff(chosenDate, 'weeks');
    const hrs = now.diff(chosenDate, 'hours');
  
    $scope.daysAgo = days;
    $scope.weeksAgo = weeks;
    // $scope.displayDate = weeksUPSI;
    // $scope.weeksLMP = weeksLMP;
    $scope.fromConception38 = 'For Conception - 38 Weeks ahead: ' + upsiDate.add(38, 'weeks').format(dateFormat);
    $scope.fromLMP40 = 'After LMP - 40 Weeks ahead: ' + lmpDate.add(40, 'weeks').format(dateFormat);
  

    
    if (weeks < 38) {
      $scope.answer = 'This is under 38 weeks';
      console.log('This is under 38 Weeks');
      prangeC.hide();
      $scope.showHourMsg = true;
    } else if (hrs > 120) {
      $scope.answer = 'This is over 38 Weeks';
      prangeC.show();
      $scope.showHourMsg = false;
      console.log('This is over 38 Weeks');
    }
    console.log('Weeksupsi?' + $scope.fromConception38);
    $scope.weeksUPSI = $scope.fromConception38;
    $scope.weeksLMP = $scope.fromLMP40;
  }
 
  // Watch for changes in the displayDate variable
  $scope.$watch('displayDate', function(newVal, oldVal) {
    if (newVal !== oldVal) {
      updateDate(); // Call updateDate when the displayDate changes
    }
  });
  $('#datetimepicker1').datetimepicker({
    format: dateFormat
  });
  

  // Call the updateDate function when the date picker changes
  $('#datetimepicker1').on('dp.change', function(e) {
    console.log('WTF' + e.date);

    updateDate(); // Call the function to update the date

  });

  input.on('input', updateDate);
  input.on('click', updateDate);
  $('span.glyphicon-calendar').on('click', updateDate);

  $('#datetimepicker1').click(function() {
    updateDate();
    hourRes.show();
  });
  
  // Initialize the input and DateChosen elements with the current date
  const nowDate = new Date();
  input.val(formatDate(nowDate));
  DateChosen.html('Todays Date: ' + formatDate(nowDate));
  

}]); //End firstApp timeController


