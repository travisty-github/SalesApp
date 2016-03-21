(function() {
  CustomersController.$inject = ['$scope', '$route', 'customersFactory'];

  function CustomersController($scope, $route, customersFactory) {

    $scope.reverse = false;
    $scope.sortBy = 'name';
    $scope.customers = [];

    function init() {
      $scope.customers = customersFactory.getCustomers();
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
