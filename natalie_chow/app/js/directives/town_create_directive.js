module.exports = function(app) {
  app.directive('townCreate', function() {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: '/templates/town_create_directive.html',
      scope: {
        townData: '=',
        formLegend: '@',
        formSubmit: '&'
      },
      controller: function($scope) {
        $scope.townData = $scope.townData;
      }
    };
  });
};
