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
      for (var i = 0; i < $scope.customers.length; i++) {
        if ($scope.customers[i].id === id) {
          $scope.customers.splice(i, 1);
          break;
        }
      }
    };

  }

  angular.module('customersApp').controller('CustomersController', CustomersController);

}());
