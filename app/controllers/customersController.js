(function() {
  CustomersController.$inject = ['$scope', '$route', 'customersService', 'appSettings'];

  function CustomersController($scope, $route, customersService, appSettings) {

    $scope.reverse = false;
    $scope.sortBy = 'name';
    $scope.customers = [];
    $scope.appSettings = appSettings;

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
