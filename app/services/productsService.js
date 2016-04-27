(function() {
  var productsService = function($http) {

    this.getProducts = function() {
      return $http.get('http://localhost:3000/api/products');
    };


    // TODO Cache all proucts locally to prevent lots of requests.
    this.getProduct = function(id) {
      return $http.get('http://localhost:3000/api/products/' + id);
    };

  };

  productsService.$inject = ['$http'];

  angular.module('customersApp').service('productsService', productsService);

}());
