(function() {

  AddOrdersController.$inject = ['$scope', '$routeParams', 'productsService', 'customersService', '$log'];

  function AddOrdersController($scope, $routeParams, productsService, customersService, $log) {

      customersService.getCustomer($routeParams.customerId)
        .success(function(customer) {
          $scope.customerName = customer.name;
        });

      productsService.getProducts()
        .success(function(products) {
          $scope.products = products;
        });



  }

  angular.module('customersApp').controller('AddOrdersController', AddOrdersController);
}());
