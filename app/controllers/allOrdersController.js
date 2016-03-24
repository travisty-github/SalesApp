(function() {

  AllOrdersController.$inject = ['$scope', 'customersService', '$log'];

  function AllOrdersController($scope, customersService, $log) {
    var allOrders = [];
    $scope.allOrdersTotal = 0;
    $scope.totalClass = 'danger';

    var customers = customersService.getCustomers()
      .then(function(response) {
        var customers = response.data;
        customers.forEach(function(customer) {
          customer.orders.forEach(function(order) {
            allOrders.push(order);
          });
        });
        $scope.allOrders = allOrders;

        $scope.allOrdersTotal = $scope.allOrders.reduce(function(total, current) {
          return total + parseInt(current.total);
        }, 0);

        $scope.totalClass = ($scope.allOrdersTotal > 300) ? 'success' : 'danger';

      }, function(response) {
        $log.log('[allOrdersController] Error getting customers: ' + response.status + ' ' + statusText);
      });
  }

  angular.module('customersApp').controller('AllOrdersController', AllOrdersController);
}());
