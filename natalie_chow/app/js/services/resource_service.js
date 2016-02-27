module.exports = exports = function(app) {
  app.factory('Resource', ['$http', function($http) {
    return function(resource) {
      return {
        baseUrl: 'http://localhost:3000/api',
        read: function() {
          return $http.get(this.baseUrl + resource);
        },
        create: function(data, token) {
          return $http.post(this.baseUrl + resource, data, {
            headers: { 'token': token }
          });
        },
        update: function(data, token) {
          return $http.put(this.baseUrl + resource + '/' + data._id, data, {
            headers: { 'token': token }
          });
        },
        delete: function(data, token) {
          return $http.delete(this.baseUrl + resource + '/' + data._id, {
            headers: { 'token': token }
          });
        }
      };
    };
  }]);
};
