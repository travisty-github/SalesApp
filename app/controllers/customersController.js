(function() {
  CustomersController.$inject = ['$scope', '$route', 'customersService'];

  function CustomersController($scope, $route, customersService) {

    $scope.reverse = false;
    $scope.sortBy = 'name';
    $scope.customers = [];

    function init() {
      $scope.customers = customersService.getCustomers();
    }
    init();

    $scope.sort = function(propertyName) {
      if ($scope.sortBy === propertyName) {
        $scope.reverse = !$scope.reverse;
        return;
      }
      $scope.sortBy = propertyName;
    };

  }

  angular.module('customersApp').controller('CustomersController', CustomersController);

}());
