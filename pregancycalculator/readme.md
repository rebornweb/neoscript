Bugs works on one pick but not twice!

Refresher

Module Definitions:

// Define the rootApp module and inject firstApp and secondApp as dependencies
var rootApp = angular.module('rootApp', ['firstApp', 'secondApp']);
// Define the firstApp module and inject dependencies such as ngAnimate, ngSanitize, and ui.bootstrap
var firstApp = angular.module('firstApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
// Define the secondApp module and inject ngMaterial as a dependency
var secondApp = angular.module('secondApp', ['ngMaterial']);
Controllers:
a. hourController: This controller is associated with the firstApp module and handles date manipulation and calculations.

b. prangeController: This controller is associated with the secondApp module and appears to handle some date range calculations.

c. AppCtrl: This controller is associated with the secondApp module and appears to handle date-related functionality.

d. rootCon: This controller is associated with the rootApp module, but its contents are not visible in the code snippet you provided.

Configurations:
The secondApp module has a configuration block that configures date formatting and parsing using $mdDateLocaleProvider from Angular Material.

HTML and UI:
The code references various HTML elements and classes like datetimepicker1, fullc, prangeC, etc. These elements seem to be part of the user interface (UI) and interact with the AngularJS controllers.

40 weeks (280 days from the LMP) is 9 months Estimated due date March 1st to December

Example:
Last LMP 10 Jan
UPSI 22 and 28