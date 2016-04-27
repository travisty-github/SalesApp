/* Interacts with backend to provide customer data interaction. */

(function() {
  var customersService = function($http, appSettings) {

    // Get all customers
    this.getCustomers = function() {
      return $http.get(appSettings.backend + '/api/customers');
    };

    // Get a specific customer
    this.getCustomer = function(customerId) {
      return $http.get(appSettings.backend + '/api/customers/' + customerId);
    };

    // Delete a specific customer
    this.deleteCustomer = function(customerId) {
      return $http.delete(appSettings.backend + '/api/customers/' + customerId);
    };

    // Create a new customer
    this.createCustomer = function(name, city) {
      return $http.post(appSettings.backend + '/api/customers/', {
        name: name,
        city: city
      });
    };

    // Update customer orders
    this.updateCustomerOrders = function(customerId, orders) {
      return $http.put(appSettings.backend + '/api/customers/' + customerId + '/orders', orders);
    };

    // Reset customers
    this.resetCustomers = function() {
      return $http.delete(appSettings.backend + '/api/customers');
    };

  };

  customersService.$inject = ['$http', 'appSettings'];

  angular.module('customersApp').service('customersService', customersService);

}());
