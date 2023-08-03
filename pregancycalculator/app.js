//: \\srv-web-dev\e$\Web\IUDCalc
//Module Rules and controller
//var comp = angular.module('app', []);
// https://www.codeproject.com/Articles/862602/Define-Multiple-Angular-Apps-In-One-Page
//!!Your going to have to redo the hide and show on the condition hours!!
//Round up or Down
//https://stackoverflow.com/questions/17691202/round-up-round-down-a-momentjs-moment-to-nearest-minute

//secondApp gets injected into rootApp <body ng-app='rootApp'> scope

//Make Structure Diagram

var rootApp = angular.module('rootApp', ['firstApp','secondApp']);

var firstApp = angular.module('firstApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);


//UPSI controller
firstApp.controller('hourController', ['$scope', function($scope) {


  $scope.today = new Date();
  $scope.hour = {value:null};
  $scope.answer = 'Higher';
  $scope.added = new Date();
  $scope.showElement = 'false';

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




$(function() {
  const dateFormat = 'dddd, MMMM Do YYYY, h:mm:ss a';
  const input = $('.form-control');
  const hourRes = $('.hourRes');
  const prangeC = $('#prangeC');
  const DateChosen = $('.DateChosen');

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

    const weeksUPSI = 'For Conception - 38 Weeks ahead: ' + upsiDate.add(38, 'weeks').format(dateFormat);
    const weeksLMP = 'After LMP - 40 Weeks ahead: ' + lmpDate.add(40, 'weeks').format(dateFormat);

    console.log(now.diff(chosenDate, 'minutes')); // 44700
    console.log(now.diff(chosenDate, 'hours')); // 745
    console.log(now.diff(chosenDate, 'days')); // 31
    console.log('Weeks diff' + now.diff(chosenDate, 'weeks')); // 4

    $('#daysAgo').html(days);
    $('#weeksAgo').html(weeks);
    $('#fromConception38').html(weeksUPSI);
    $('#fromLMP40').html(weeksLMP);

    if (weeks < 38) {
      $('#answer').val('This is under 38 weeks');
      console.log('This is under 38 Weeks');
      prangeC.hide();
      $('h3.hourMsg').show();
    } else if (hrs > 120) {
      $('#answer').val('This is over 38 Weeks');
      prangeC.show();
      $('h3.hourMsg').hide();
      console.log('This is over 38 Weeks');
    }
  }

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
});

}]); //End firstApp hourController

(function () {
  'use strict';
var  secondApp = angular.module('secondApp', ['ngMaterial']);




secondApp.controller('prangeController', ['$scope', function($scope) {


}]);//End prangeController

  secondApp.config(function($mdDateLocaleProvider) {
    /**
     * @param date {Date}
     * @returns {string} string representation of the provided date
     */
    $mdDateLocaleProvider.formatDate = function(date) {

if (!date) {return '';

} else {
         return moment(date).format('DD-MM-YYYY');
}

      //return date ? moment(date).format('L') : '';
    };

    /**
     * @param dateString {string} string that can be converted to a Date
     * @returns {Date} JavaScript Date object created from the provided dateString
     */


$mdDateLocaleProvider.parseDate = function(dateString) {
      var m = moment(dateString, 'DD-MM-YYYY', true);
          return m.isValid() ? m.toDate() : new Date(NaN);
    };
  })
  .controller("AppCtrl", function($log) {
this.DateTrue = false;
var mD = this.myDate,
sD = this.selected,
iD = this.iudLast,
pD = this.Date,
tD = this.todaysDate;

var rightnow = new Date();



    this.onDateChanged = function() {

      $log.log('Updated Date: ', this.myDate);

      Date.prototype.addDays = function(days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
      }

      var date = this.myDate;



// This variables change the results directly!
var dp = document.getElementById("fullc").value;
//Iud backtrack from next period
var dayForLastIud = 10;
//1st day Ovulation Backtrack from full cycle
var firstO = 15;
//var get = this.myDate.getDate();

  //var getDate = this.myDate.getDate();

     //y is full cycle number
       var y = parseInt(dp);
      var x = dayForLastIud;
      var z = firstO;

      //Full cycle set date

this.selected = date;
//Now True
 this.periodDateTrue = true;
      //alert(this.myDate.getDate());
 this.Date = date.addDays(y);

 //Full Cycle minus firstOvulation number (backtrack)
   //example 28 - 14 = Day 15
 this.firstOv = date.addDays(y - z);

  //Full Cycle minus last IUD number (backtrack)
  //example 28 - 10 = 18 days from the last
 this.iudLast = date.addDays(y - x);
//Start of message boolean
this.IUDright = null;



console.log('WTF !!!!!' + iudLastMinusTimestamp +' or ' + rightnowMinusTimestamp  );


if ( rightnow > this.iudLast) {
      //$('#answer').html('Todays date is too late for IUD');
console.log('Todays date is too late for IUD '+ rightnow +' is ahead Iud Last: ' + this.iudLast);
this.IUDright = false;

} else {
      //    $('#answer').html('Todays date is still good for IUD');
    console.log('Todays date is still good for IUD '+ rightnow +' is behind Iud Last: ' + this.iudLast);
this.IUDright = null;

}

//Format for Comparison is 2010-MM-DD *****Start
var rightnowMinusTimestamp = moment(rightnow).format('DD-MM-YYYY');
 var iudLastMinusTimestamp = moment(this.iudLast).format('DD-MM-YYYY')
 function compare(dateTimeA, dateTimeB) {
    var momentA = moment(dateTimeA,"DD/MM/YYYY");
    var momentB = moment(dateTimeB,"DD/MM/YYYY");
if (momentA > momentB){
    return 1;
  } else if (momentA < momentB){
    return -1;
  } else {
    return 0;
 }

};
//If equals 1 then IUD last is ahead of present time
//If equals -1 then IUD Last is behind present timeout
//If equals 0 then IUD last is the same day/time
var comparison = compare(iudLastMinusTimestamp, rightnowMinusTimestamp );
 console.log('Comparison:' + comparison);
var iudlastAheadorNot = compare(iudLastMinusTimestamp, rightnowMinusTimestamp );
//Special condition for if the Last Iud is Todays date
if (comparison == 0){
this.IUDright = true;
}


};//End controller

//Clear date after changing fullcycle
this.clearDate = function (){
this.periodDateTrue = false;
this.myDate = null;
};


  });



//  jQuery(document).ready(function($) {
      //setTimeout(changeText, 30000);
  //});


})();

rootApp.controller('rootCon', ['$scope', function($scope) {


}]);
