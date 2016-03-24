(function() {

  AllOrdersController.$inject = ['$scope', 'customersService', '$log'];

  function AllOrdersController($scope, customersService, $log) {
    var allOrders = [];

    var customers = customersService.getCustomers()
    .then(function(response) {
      var customers = response.data;
      customers.forEach(function(customer) {
        customer.orders.forEach(function(order) {
          allOrders.push(order);
        });
      });
      $scope.allOrders = allOrders;

    }, function(response) {
      $log.log('[allOrdersController] Error getting customers: ' + response.status + ' ' + statusText);
    });

  }

  angular.module('customersApp').controller('AllOrdersController', AllOrdersController);
}());
