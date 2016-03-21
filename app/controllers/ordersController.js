(function() {
  // Inject manually for minification.
  OrderController.$inject = ['$scope', '$routeParams', 'customersFactory'];

  function OrderController($scope, $routeParams, customersFactory) {
    var customerId = $routeParams.customerId;
    $scope.orders = null;
    customer = null;

    function init() {
      customer = customersFactory.getCustomer(customerId);
    }
    init();

    $scope.orders = customer.orders;
    $scope.name = customer.name;

  }

  angular.module('customersApp').controller('OrdersController', OrderController);

}());
