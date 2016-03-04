module.exports = exports = function(app) {
  app.factory('Resource', ['$http', 'salemAuth', function($http, salemAuth) {
    return function(resource) {
      return {
        baseUrl: 'http://localhost:3000/api' + resource,
        read: function() {
          return $http.get(this.baseUrl);
        },
        create: function(data) {
          return $http.post(this.baseUrl, data, {
            headers: { 'token': salemAuth.getToken() }
          });
        },
        update: function(data) {
          return $http.put(this.baseUrl + '/' + data._id, data, {
            headers: { 'token': salemAuth.getToken() }
          });
        },
        delete: function(data) {
          return $http.delete(this.baseUrl + '/' + data._id, {
            headers: { 'token': salemAuth.getToken() }
          });
        }
      };
    };
  }]);
};
