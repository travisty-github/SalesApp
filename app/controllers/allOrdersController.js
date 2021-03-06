/* Displays all orders for all customers. Additionally highlights the total
   row to show whether a subjective target has been met. */

(function() {

  AllOrdersController.$inject = ['$scope', 'customersService', 'productsService', '$log'];

  function AllOrdersController($scope, customersService, productsService, $log) {
    // Initialise variables.
    var allOrders = [];
    $scope.allOrdersTotal = 0;
    $scope.totalClass = '';
    $scope.salesTarget = 1000;

    // Retrieve all customers from the backend.
    var customers = customersService.getCustomers()
      .then(function(response) {
        var customers = response.data;
        customers.forEach(function(customer) {
          customer.orders.forEach(function(order) {
            // Only add orders that have an id. A customer with no orders
            // shows up as an empty object.
            if (order.id) {
              allOrders.push(order);
            }
          });
        });

        // Normalise order quantities (i.e. collect quantities for each product ID)
        var normalisedOrderQuantities = {};
        allOrders.forEach(function(order) {
          if (normalisedOrderQuantities[order.id])
            normalisedOrderQuantities[order.id] += parseInt(order.quantity);
          else
            normalisedOrderQuantities[order.id] = parseInt(order.quantity);
        });

        // Convert key/value store to array of objects.
        var normalisedOrderQuantitiesArray = Object.keys(normalisedOrderQuantities).map(function(productID) {
          return {
            id: parseInt(productID),
            quantity: normalisedOrderQuantities[productID]
          };
        });

        // Updates total of orders as each product is retrieved. Will only
        // give a result once all products are retrieved (unretrieved products
        // will be missing the required properties)
        var updateTotal = function() {
          $scope.allOrdersTotal = $scope.allOrders.reduce(function(total, current) {
            return total + parseInt(current.unitCost) * current.quantity;
          }, 0);

          // Update the class for the total row based on target threshold.
          $scope.totalClass = ($scope.allOrdersTotal >= $scope.salesTarget) ? 'success' : 'danger';
        };

        // Populate order details with information about products from backend.
        normalisedOrderQuantitiesArray.forEach(function(order) {
          productsService.getProduct(order.id)
            .success(function(product) {
              order.name = product.name;
              order.unitCost = product.cost;
              updateTotal();
            });
        });

        $scope.allOrders = normalisedOrderQuantitiesArray;

      }, function(response) {
        $log.log('[allOrdersController] Error getting customers: ' + response.status + ' ' + statusText);
      });

      $scope.updateSalesTarget = function() {
          $scope.totalClass = ($scope.allOrdersTotal >= $scope.salesTarget) ? 'success' : 'danger';
      };
  }

  angular.module('customersApp').controller('AllOrdersController', AllOrdersController);
}());
