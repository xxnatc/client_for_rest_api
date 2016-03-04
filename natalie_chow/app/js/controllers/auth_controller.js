module.exports = function(app) {
  app.controller('AuthController', ['$scope', '$http', 'salemAuth', function($scope, $http, salemAuth) {
    $scope.username = null;

    var handleUserError = function(err) {
      console.log(err);
      $scope.authWarning = err.data.msg;
    };

    var updateUsername = function() {
      salemAuth.getUsername()
        .then((res) => {
          $scope.username = res.data.username;
        });
    };

    $scope.signup = function(user) {
      $scope.authWarning = null;
      salemAuth.signUp(user)
        .then(() => {
          updateUsername();
        }, handleUserError);
    };

    $scope.signin = function(user) {
      $scope.authWarning = null;
      salemAuth.signIn(user)
        .then(() => {
          updateUsername();
        }, handleUserError);
    };

    $scope.logout = function() {
      salemAuth.signOut()
        .then(() => {
          $scope.$apply(() => {
            $scope.username = null;
          });
        });
    };
  }]);
};
