(function() {
  // Inject manually for minification.
  OrderController.$inject = ['$scope', '$routeParams', 'customersService', '$log'];

  function OrderController($scope, $routeParams, customersService, $log) {
    var customerId = $routeParams.customerId;
    $scope.orders = null;
    customer = null;

    function init() {
      customersService.getCustomer(customerId)
      .success(function(customer) {
        $scope.customer = customer;
        $scope.orders = customer.orders;
        $scope.name = customer.name;
      })
      .error(function(data, status, headers, config) {
        $log.log('');
        console.log('Failed to get customer: '+ data.error + ' ' + status);
      });
    }
    init();


  }

  angular.module('customersApp').controller('OrdersController', OrderController);

}());
