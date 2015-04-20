var app = angular.module('portfolioApp',
[
'ngRoute',
'jsonService'

]). //Start Router
config(['$routeProvider', function ($routeProvider){
 $routeProvider.
 
   when("/home", {templateUrl:"partials/home.html", controller:"mindTrick"}).
    when("/portfolio", {templateUrl:"partials/portfolio.html", controller:"mindTrick"}).
    when("/code", {templateUrl:"partials/code.html", controller:"mindTrick"}).
    when("/contact", {templateUrl:"partials/contact.html", controller:"mindTrick"}).

    otherwise({redirectTo:"/home"});
        
        
        
        
}]);

app.controller('mindTrick', function($scope,JsonService){

 JsonService.get(function(data){
    $scope.portfolioList = data.portfolioList;

});    



    
    
});
