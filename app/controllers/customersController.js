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

          // Determine order totals. Need to pull list of products from backend
          // to get prices.
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
              for (var i = 0; i < customers.length; i++) {
                $scope.customers[i].orderTotal = customers[i].orders.reduce(totalCost, 0);
              }

            });
        })
        .error(function(data) {
          console.log('Error getting customers: ' + data);
        });
    }
    init();

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
          console.log('Failed to delete customer: ' + response.status + ' ' + response.data);
        }
      );
    };

    // Insructs the backend to reset all changes to the customers.
    // Re-fetches the reset data.
    $scope.resetCustomers = function() {
      customersService.resetCustomers()
        .success(function() {
          customersService.getCustomers()
            .success(function(customers) {
              $scope.customers = customers;
            });
        });
    };
  }

  angular.module('customersApp').controller('CustomersController', CustomersController);

}());
