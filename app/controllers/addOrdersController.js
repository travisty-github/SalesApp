(function() {

  AddOrdersController.$inject = ['$scope', '$routeParams', 'productsService', 'customersService', '$log'];

  function AddOrdersController($scope, $routeParams, productsService, customersService, $log) {

      // Get customer details
      var customerOrders = [];
      customersService.getCustomer($routeParams.customerId)
        .success(function(customer) {
          $scope.customerName = customer.name;
          customerOrders = customer.orders;
        });

      // Get all products
      productsService.getProducts()
        .success(function(products) {

          // Determine the quantity of the product already on order by the customer.
          products = products.map(function(product) {
            var productOrder = customerOrders.find(function(order) {
              return order.id === product.id;
            });
            product.orderQuantity = productOrder ? parseInt(productOrder.quantity) : 0;
            // Keep a copy of original order quantity to track modified items.
            product.originalOrderQuantity = product.orderQuantity;

            return product;
          });

          $scope.products = products;
        });

        // Highlight each modified row
        $scope.highlightModifiedRows = function() {
          $scope.products.forEach(function(product) {
            if (product.orderQuantity !== product.originalOrderQuantity) {
              product.rowClass = 'success';
            } else {
              product.rowClass = '';
            }
          });
        };
  }

  angular.module('customersApp').controller('AddOrdersController', AddOrdersController);
}());
