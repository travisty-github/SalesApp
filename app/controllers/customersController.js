(function() {
  CustomersController.$inject = ['$scope'];
  function CustomersController($scope) {
    $scope.reverse = false;
    $scope.sortBy = 'name';

    $scope.customers = [{
      joined: '2012-10-09',
      name: 'Travis',
      city: 'Brisbane',
      orderTotal: 134.435
    }, {
      joined: '2013-11-02',
      name: 'John',
      city: 'Melbourne',
      orderTotal: 414.437
    }, {
      joined: '2007-10-19',
      name: 'Jack',
      city: 'Perth',
      orderTotal: 99.211
    }];

    $scope.sort = function(propName) {
      if($scope.sortBy === propName) {
        $scope.reverse = !$scope.reverse;
        return;
      }
      $scope.sortBy = propName;
    };


  }

  angular.module('customersApp').controller('CustomersController', CustomersController);

}());
