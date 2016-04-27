(function() {

  AllOrdersController.$inject = ['$scope', 'customersService', 'productsService', '$log'];

  function AllOrdersController($scope, customersService, productsService, $log) {
    var allOrders = [];
    $scope.allOrdersTotal = 0;
    $scope.totalClass = '';

    var customers = customersService.getCustomers()
      .then(function(response) {
        var customers = response.data;
        customers.forEach(function(customer) {
          customer.orders.forEach(function(order) {
            allOrders.push(order);
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
        $scope.totalClass = ($scope.allOrdersTotal > 300) ? 'success' : 'danger';
        };

        // Populate order details.
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
  }

  angular.module('customersApp').controller('AllOrdersController', AllOrdersController);
}());
