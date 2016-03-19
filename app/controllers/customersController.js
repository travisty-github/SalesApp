(function() {
  var CustomersController = function($scope) {
    $scope.reverse = false;
    $scope.sort = 'name';
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

    $scope.sortBy = function(name) {
      $scope.sort = name;
      $scope.reverse = !$scope.reverse;
      console.log($scope.sort);
    };
  };

  angular.module('customersApp').controller('CustomersController', CustomersController);
}());
