(function() {
  // Inject manually for minification.
  OrderController.$inject = ['$scope', '$routeParams', 'customersService', 'productsService', '$log'];

  function OrderController($scope, $routeParams, customersService, productsService, $log) {
    var customerId = $routeParams.customerId;
    $scope.orders = null;
    customer = null;

    function init() {
      customersService.getCustomer(customerId)
        .success(function(customer) {
          $scope.customer = customer;
          $scope.orders = customer.orders;
          $scope.name = customer.name;

          $scope.customer.orders.forEach(function(order) {
            if (order.id) {
              productsService.getProduct(order.id)
                .success(function(product) {
                  order.unitPrice = product.cost;
                  order.product = product.name;
                  order.total = order.unitPrice * order.quantity;
                });
            }
          });
        })
        .error(function(data, status, headers, config) {
          $log.log('');
          console.log('Failed to get customer: ' + data.error + ' ' + status);
        });
    }
    init();


  }

  angular.module('customersApp').controller('OrdersController', OrderController);

}());
