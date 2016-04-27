(function() {
  'use strict';

  AddCustomerController.$inject = ['$scope', '$window', 'customersService'];

  function AddCustomerController($scope, $window, customersService) {
    $scope.name = '';
    $scope.city = '';

    $scope.createCustomer = function() {
      console.log('creating');
      // POST new customer
      customersService.createCustomer($scope.name, $scope.city)
        .then(function(response) {
          if (response.status === 200) {
            $window.location.href = '/';
          }


        });

    };
  }

  angular.module('customersApp').controller('AddCustomerController', AddCustomerController);

}());
