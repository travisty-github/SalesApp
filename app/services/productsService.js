/* Interacts with backend to provide services for products */
(function() {
  var productsService = function($http) {

    // Get all products
    this.getProducts = function() {
      return $http.get('http://localhost:3000/api/products');
    };


    // Get a specific product.
    // TODO Cache all proucts locally to prevent lots of requests.
    this.getProduct = function(id) {
      return $http.get('http://localhost:3000/api/products/' + id);
    };

  };

  productsService.$inject = ['$http'];

  angular.module('customersApp').service('productsService', productsService);

}());
