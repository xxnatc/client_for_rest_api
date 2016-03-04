module.exports = exports = function(app) {
  app.factory('salemAuth', ['$http', '$window', function($http, $window) {
    var token;
    var username;

    var auth = {
      baseUrl: 'http://localhost:3000/api',
      signUp: function(userData) {
        return $http.post(this.baseUrl + '/signup', userData)
          .then(function(res) {
            token = res.data.token;
            $window.localStorage.salemToken = res.data.token;
          });
      },
      signIn: function(userData) {
        return $http.get(this.baseUrl + '/signin', {
          headers: { 'Authorization': 'Basic ' + btoa(userData.email + ':' + userData.password) }
        }).then(function(res) {
          token = res.data.token;
          $window.localStorage.salemToken = res.data.token;
        });
      },
      getToken: function() {
        return token = token || $window.localStorage.salemToken;
      },
      getUsername: function() {
        return $http.get(this.baseUrl + '/currentuser', {
          headers: { 'token': auth.getToken() }
        }).then(function(res) {
          username = res.data.username;
          return res;
        });
      },
      signOut: function() {
        return new Promise(function(resolve) {
          $window.localStorage.salemToken = null;
          token = null;
          username = null;
          resolve();
        });
      },
    };

    return auth;
  }]);
};
