/* Adds a customer to the backend */

(function() {
  'use strict';

  AddCustomerController.$inject = ['$scope', '$window', 'customersService'];

  function AddCustomerController($scope, $window, customersService) {
    // Initialise blank values for input fields.
    $scope.name = '';
    $scope.city = '';

    // Create a new customer by sending a POST request to the backend.
    $scope.createCustomer = function() {
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
