(function() {
  // Inject manually for minification.
  OrderController.$inject = ['$scope', '$routeParams', 'customersService'];

  function OrderController($scope, $routeParams, customersService) {
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
      .error(function(data) {
        console.log('Failed to get customer: '+ data);
      });
    }
    init();


  }

  angular.module('customersApp').controller('OrdersController', OrderController);

}());
