/* Interacts with backend to provide services for products */
(function() {
  var productsService = function($http, appSettings) {

    // Get all products
    this.getProducts = function() {
      return $http.get(appSettings.backend + '/api/products');
    };


    // Get a specific product.
    // TODO Cache all proucts locally to prevent lots of requests.
    this.getProduct = function(id) {
      return $http.get(appSettings.backend + '/api/products/' + id);
    };

  };

  productsService.$inject = ['$http', 'appSettings'];

  angular.module('customersApp').service('productsService', productsService);

}());
