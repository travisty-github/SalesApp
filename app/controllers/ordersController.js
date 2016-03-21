(function() {
  // Inject manually for minification.
  OrderController.$inject = ['$scope', '$routeParams'];

  function OrderController($scope, $routeParams) {
    var customerId = $routeParams.customerId;
    $scope.orders = null;

    function init() {
      var customer = $scope.customers.filter(function(d) {
        return d.id === parseInt(customerId);
      });

      if (customer.length !== 1) {
        throw new Error("Expected 1 match, got " + customer.length + " matches");
      }

      $scope.orders = customer[0].orders;
    }

    $scope.customers = [{
      id: 1,
      joined: '2012-10-09',
      name: 'Travis',
      city: 'Brisbane',
      orderTotal: 134.435,
      orders: [{
        id: 1,
        product: 'Shoes',
        total: 123.435
      }]
    }, {
      id: 2,
      joined: '2013-11-02',
      name: 'John',
      city: 'Melbourne',
      orderTotal: 414.437,
      orders: [{
        id: 2,
        product: 'Pants',
        total: 314.437
      }, {
        id: 3,
        product: 'Belt',
        total: 100
      }]
    }, {
      id: 3,
      joined: '2007-10-19',
      name: 'Jack',
      city: 'Perth',
      orderTotal: 199.211,
      orders: [{
        id: 4,
        product: 'Hat',
        total: 99.211
      }, {
        id: 3,
        product: 'Belt',
        total: 100
      }]
    }];
    init();
  }

  angular.module('customersApp').controller('OrdersController', OrderController);

}());
