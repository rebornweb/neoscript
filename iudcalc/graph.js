
//New Graph Code

var yum = angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'chart.js']);

yum.controller('ModalDemoCtrl', function($uibModal, $log, $document) {
var $ctrl = this;
$ctrl.animationsEnabled = true;
$ctrl.open = function(size, parentSelector) {
var parentElem = parentSelector ?
angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
var modalInstance = $uibModal.open({
  animation: $ctrl.animationsEnabled,
  ariaLabelledBy: 'modal-title',
  ariaDescribedBy: 'modal-body',
  templateUrl: 'myModalContent.html',
  controller: 'ModalInstanceCtrl',
  controllerAs: '$ctrl',
  size: size,
  appendTo: parentElem,
  resolve: {
    items: function() {
      return $ctrl.items;
    }
  }
});

modalInstance.result.then(function(selectedItem) {
  $ctrl.selected = selectedItem;
  }, function() {
    $log.info('Modal dismissed at: ' + new Date());
  });
};

$ctrl.openComponentModal = function() {
  var modalInstance = $uibModal.open({
  animation: $ctrl.animationsEnabled,
  component: 'modalComponent',
  resolve: {
    items: function() {
      return $ctrl.items;
    }
  }
});

modalInstance.result.then(function(selectedItem) {
    $ctrl.selected = selectedItem;
  }, function() {
    $log.info('modal-component dismissed at: ' + new Date());
  });
};
});

//Call Graph
angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function($uibModalInstance, $scope) {
  var $ctrl = this;

  $scope.labels = ['IUD Availablity'];
  $scope.series = ['Period Length',  'Beginning of Ovulation', 'IUD End', 'Full Cycle'];

  //$scope.dayOvu = function() {
    //  alert($scope.firstOvu + 'firstOvu');
  //};
var html = document.getElementById("datHolder");
  var div = document.createElement("div");
div.innerHTML = html;
//alert(div.innerText); // Hello, World




var expovu = document.getElementById("expectovu").value;

var iudEnd = document.getElementById("iudend").value;
var fullC = document.getElementById("fullc").value;
  //alert(typeof expovu);
//alert(dateTransfer);
  $scope.data = [

    [expovu],
    [iudEnd],
    [fullC],
  ];
  $scope.options = {
    legend: {
    display: true
  }
};

  $ctrl.ok = function() {
    $uibModalInstance.close();
  };

  $ctrl.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});

//console.log(angular.element('#username')[0].value);
angular.module('ui.bootstrap.demo').component('modalComponent', {
  templateUrl: 'myModalContent.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function() {
    var $ctrl = this;
    $ctrl.$onInit = function() {
      $ctrl.items = $ctrl.resolve.items;
      $ctrl.selected = {
      item: $ctrl.items[0]
    };
  };
  $ctrl.ok = function() {
    $ctrl.close({
      $value: $ctrl.selected.item
    });
  };

$ctrl.cancel = function() {
  $ctrl.dismiss({
    $value: 'cancel'
  });
};
}
});
