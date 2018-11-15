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

 $('.hourRes,#prangeC').hide();
 var a1 = moment(new Date());//now
 var a2 = a1.format("dddd, MMMM Do YYYY, h:mm:ss a");
 $('input.form-control').val(a2);

 $('h5.DateChosen').html('Todays Date: ' + a2);


function upDate() {

 var dateStr = $('input.form-control').val();//Input
 var a = moment(new Date());//now
 var b = moment(dateStr,"dddd, MMMM Do YYYY, h:mm:ss a");//Date chosen


//Check difference
 var mins ='Minutes ago: ' + a.diff(b, 'minutes');
 var hours ='Hours ago: '+ a.diff(b, 'hours');
 var days ='Days ago: '+ a.diff(b, 'days');
 var weeks = a.diff(b, 'weeks');
 var hrs = a.diff(b, 'hours');

 console.log(a.diff(b, 'minutes')); // 44700
 console.log(a.diff(b, 'hours')); // 745
 console.log(a.diff(b, 'days')); // 31
 console.log(a.diff(b, 'weeks')); // 4

 $scope.hour = {value:130};


 $('#daysAgo').html(days);//Input
 $('#hoursAgo').html(hours);//Input
  //$('#minutesAgo').html(mins);
 var hourLimit = $('#hourz').val(hrs);


if(hrs < 120) {

 $('#answer').val('This is under 120 hours');
 console.log('This is under 120');

 $('#prangeC').hide();
 $('h3.hourMsg').show();

} else if(hrs > 120) {

$('#answer').val('This is over 120 hours');
$('#prangeC').show();
$('h3.hourMsg').hide();
console.log('This is over 120');

}

  };


  $('#datetimepicker1').datetimepicker({
      format: 'dddd, MMMM Do YYYY, h:mm:ss a'
    });

 $("#datetimepicker1").on("dp.change", function (e) {
       $('#dateInput').data("DateTimePicker").minDate(e.date);
       console.log('WTF' + e.date);
    });

$('#dateInput').on('input', upDate());//End change

$('#dateInput').on('click', upDate());

$('span.glyphicon-calendar').on('click', upDate());

$('#datetimepicker1').click(function() {
 upDate();
  $('.hourRes').show();

});//End clicked





});

}]); //End firstApp hourController

(function () {
  'use strict';
var  secondApp = angular.module('secondApp', ['ngMaterial']);




secondApp.controller('prangeController', ['$scope', function($scope) {

//This .value is the one being manipulated
// Very important variables
 $scope.min1 = 21;
 $scope.max1 = 42;
//Period range
 $scope.min = 21;
 $scope.max = 42;
 $scope.expovu = 14;
 $scope.iudrange = 5;

 //input
 $scope.totalcycle = null;// nine
  //console.log($scope.answer);

 $scope.today = new Date();
 $scope.change =  new Date();




//Pure JS
 $scope.addDays1 = function (){
//Restart $scope.change date to fresh todays date
 $scope.change =  new Date();
//Need a date for the last day of IUD range,

//Format x to a number // they shouldnt be able to continously add numbers
 var xp = document.getElementById("fullc").value;
// Give it the number property and invalid contents
 //xp.type = "number";
 //xp.value = "qwerty";

// If the string isn't empty, we have a problem
//console.log( element.value ? "Not Supported" : "Supported" );
 var changeGet = $scope.change.getDate();
 var todayGet = $scope.today.getDate();
//alert(todayGet);
  //Use the integer value for validation
 var todayInt = Date.parse($scope.today);
 var changeInt = Date.parse($scope.change);

//x is full cycle number
 var x = parseInt(xp)

console.log('adding:' + x);
console.log('change date is: ' +  changeGet);
console.log('todays date is: ' +  todayGet);

//Add days if condition is true
 var total = todayInt + changeInt;

//Full cycle length
 var fullCycleLength = x;
 //Check if you still need this condition!!!!
if(todayInt < changeInt) {


//28 - 14 = 14
 var firstiudRange = fullCycleLength - $scope.expovu; //14;

 //14 + 5 = 19
 var secondiudRange = firstiudRange + $scope.iudrange; //Iud length;

 var minusOp = '-';

//Date changes here minus for back in time, plus for forward in time
 $scope.newdate1 = $scope.change.setDate(changeGet + firstiudRange);
//$scope.newdatemin1 = $scope.change.setDate(changeGet - firstiudRange);

//Restart $scope.change date for newdate2
 $scope.change =  new Date();
 $scope.newdate2 = $scope.change.setDate(changeGet + secondiudRange);
//$scope.newdatemin2 = $scope.change.setDate(changeGet - secondiudRange);
 console.log($scope.newdate1 + '--->' +$scope.newdate2);



};



};//End method addDays


//Initiate Date by click
function clickOnUpload() {
  $timeout(function() {
    angular.element('#myrange').triggerHandler('click');
  });
};


function getScope(ctrlName) {
    var sel = 'div[ng-controller="' + ctrlName + '"]';
    return angular.element(sel).scope();
}

function changeText() {
    var $scope = getScope('prangeController');
    $scope.my = null;
    $scope.$apply();
}


$( "#fullc" ).change(function() {
  $( "#cleard" ).click();
//changeText();

});

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
