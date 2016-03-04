module.exports = exports = function(app) {
  app.factory('User', ['$http', function($http) {
    return function() {
      return {
        baseUrl: 'http://localhost:3000/api',
        signup: function(userData) {
          return $http.post(this.baseUrl + '/signup', userData);
        },
        signin: function(userData) {
          return $http.get(this.baseUrl + '/signin', {
            headers: { 'Authorization': 'Basic ' + btoa(userData.email + ':' + userData.password) }
          });
        }
      };
    };
  }]);
};
