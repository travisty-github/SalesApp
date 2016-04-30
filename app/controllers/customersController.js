/* Shows all customers, order totals and actions to modify the customers. */

(function() {
  'use strict';
  CustomersController.$inject = ['$scope', '$route', 'customersService', 'productsService', 'appSettings'];

  function CustomersController($scope, $route, customersService, productsService, appSettings) {

    // Initialise variables.
    $scope.reverse = false;
    $scope.sortBy = 'name';
    $scope.customers = [];
    $scope.appSettings = appSettings;

    function init() {

      // Get all customers
      customersService.getCustomers()
        .success(function(customers) {
          $scope.customers = customers;
          calculateTotals();
        })
        .error(function(data) {
          $log.error('Error getting customers: ' + data);
        });
    }

    init();

      // Determine order totals. Need to pull list of products from backend
      // to get prices.
    function calculateTotals() {

      productsService.getProducts()
        .success(function(products) {

          // Function to reduce array of orders to a total price
          var totalCost = function(prev, curr) {
            var product = products.find(function(product) {
              return product.id === curr.id;
            });
            if (product) {
              return prev + product.cost * curr.quantity;
            }
            return prev + 0;
          };

          // Iterate through each customer and calculate
          // their total order price.
          for (var i = 0; i < $scope.customers.length; i++) {
            $scope.customers[i].orderTotal = $scope.customers[i].orders.reduce(totalCost, 0);
          }

        });
    }

    // Sorts the customers based on which title is clicked.
    $scope.sort = function(propertyName) {
      if ($scope.sortBy === propertyName) {
        $scope.reverse = !$scope.reverse;
        return;
      }
      $scope.sortBy = propertyName;
    };

    // Deletes a customer from the backend.
    $scope.deleteCustomer = function(id) {
      // Request server deletes customer
      customersService.deleteCustomer(id).then(
        function(response) {
          // Remove customer from received customer list.
          for (var i = 0; i < $scope.customers.length; i++) {
            if ($scope.customers[i].id === id) {
              $scope.customers.splice(i, 1);
              break;
            }
          }
        },
        function(response) {
          $log.error('Failed to delete customer: ' + response.status + ' ' + response.data);
        }
      );
    };

    // Insructs the backend to reset all changes to the customers.
    // Re-fetches the reset data.
    $scope.resetCustomers = function() {
      // Request backend resets customer data.
      customersService.resetCustomers()
        .success(function() {
          // Retrieve reset customer data.
          customersService.getCustomers()
            .success(function(customers) {
              // Update scope with reset data and recalculate totals.
              $scope.customers = customers;
              calculateTotals();
            });
        });
    };
  }

  angular.module('customersApp').controller('CustomersController', CustomersController);

}());
