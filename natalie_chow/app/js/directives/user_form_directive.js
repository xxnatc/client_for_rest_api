module.exports = function(app) {
  app.directive('userForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: '/templates/user_form_directive.html',
      scope: {
        formLegend: '@',
        buttonText: '@',
        user: '=',
        save: '&'
      },
      controller: function($scope) {
        $scope.user = $scope.user;
      }
    };
  });
};
