/* Interacts with backend to provide services for products */
(function() {
  var productsService = function($http, appSettings) {

    // Get all products
    this.getProducts = function() {
      return $http.get(appSettings.backend + '/api/products', {cache: true});
    };


    // Get a specific product.
    this.getProduct = function(id) {
      return $http.get(appSettings.backend + '/api/products/' + id, {cache: true});
    };

  };

  productsService.$inject = ['$http', 'appSettings'];

  angular.module('customersApp').service('productsService', productsService);

}());
