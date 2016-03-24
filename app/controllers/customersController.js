(function() {
  CustomersController.$inject = ['$scope', '$route', 'customersService', 'appSettings'];

  function CustomersController($scope, $route, customersService, appSettings) {

    $scope.reverse = false;
    $scope.sortBy = 'name';
    $scope.customers = [];
    $scope.appSettings = appSettings;

    function init() {
      customersService.getCustomers()
        .success(function(customers) {
          $scope.customers = customers;
        })
        .error(function(data) {
          console.log('Error getting customers: ' + data);
        });
    }
    init();

    $scope.sort = function(propertyName) {
      if ($scope.sortBy === propertyName) {
        $scope.reverse = !$scope.reverse;
        return;
      }
      $scope.sortBy = propertyName;
    };

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

  }

  angular.module('customersApp').controller('CustomersController', CustomersController);

}());
