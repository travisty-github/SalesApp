(function() {
    var customersService = function($http) {

      this.getCustomers = function() {
        return $http.get('http://localhost:3000/api/customers');
      };

      this.getCustomer = function(customerId) {
        return $http.get('http://localhost:3000/api/customers/' + customerId);
      };

    };

      customersService.$inject = ['$http'];

      angular.module('customersApp').service('customersService', customersService);

    }());
