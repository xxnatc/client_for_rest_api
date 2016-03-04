module.exports = function(app) {
  app.controller('UsersController', ['$scope', '$http', 'User', function($scope, $http, User) {
    var userService = User();

    var handleUserError = function(err) {
      console.log(err);
      $scope.authWarning = err.data.msg;
    };

    $scope.signup = function(user) {
      $scope.authWarning = null;
      userService.signup(user)
        .then((res) => {
          $scope.token = res.data.token;
        }, handleUserError);
    };

    $scope.signin = function(user) {
      $scope.authWarning = null;
      userService.signin(user)
        .then((res) => {
          $scope.token = res.data.token;
        }, handleUserError);
    };

    $scope.logout = function() {
      $scope.token = null;
    };
  }]);
};
