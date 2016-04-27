/* Modifies orders for customers */

(function() {

  AddOrdersController.$inject = ['$scope', '$routeParams', 'productsService', 'customersService', '$location', '$log'];

  function AddOrdersController($scope, $routeParams, productsService, customersService, $location, $log) {

    // Get customer details
    var customerOrders = [];
    customersService.getCustomer($routeParams.customerId)
      .success(function(customer) {
        $scope.customerName = customer.name;
        $scope.customerId = customer.id;
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

    // Cancel all changes and return to main page
    $scope.cancelChanges = function() {
      $location.path('/');
    };

    // Reset all changes
    $scope.undoChanges = function() {
      $scope.products.forEach(function(product) {
        product.orderQuantity = product.originalOrderQuantity;
        // Remove all highlighting.
        product.rowClass = '';
      });

    };

    // Maps the scope objects to strip all extraneous fields.
    function mapProductsForUpdate() {
      return $scope.products.filter(function(product) {
        return (product.orderQuantity > 0);
      }).map(function(product) {
        // Only return product id and quantity.
        return {
          id: product.id,
          quantity: product.orderQuantity
        };
      });
    }

    // Save changes to backend.
    $scope.saveChanges = function() {
      customersService.updateCustomerOrders($scope.customerId, mapProductsForUpdate())
        .success(function() {
          // Set originalOrderQuantity to current quantity and remove row
          // highlighting
          $scope.products = $scope.products.map(function(product) {
            product.originalOrderQuantity = product.orderQuantity;
            product.rowClass = '';
            return product;
          });
        });
    };
  }

  angular.module('customersApp').controller('AddOrdersController', AddOrdersController);
}());
