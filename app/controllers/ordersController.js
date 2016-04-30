/* Displays all the orders for a single customer */
(function() {
  // Inject manually for minification.
  OrderController.$inject = ['$scope', '$routeParams', 'customersService', 'productsService', '$log'];

  function OrderController($scope, $routeParams, customersService, productsService, $log) {
    var customerId = $routeParams.customerId;
    $scope.orders = null;
    customer = null;

    function init() {
      // Retrieve all customers from backend.
      customersService.getCustomer(customerId)
        .success(function(customer) {
          $scope.customer = customer;
          $scope.orders = customer.orders;
          $scope.name = customer.name;

          // Calculate the total for each order (price * quantity)
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
          $log.error('Failed to get customer: ' + status);
        });
    }

    init();

  }

  angular.module('customersApp').controller('OrdersController', OrderController);

}());
