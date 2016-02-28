module.exports = function(app) {
  app.directive('mafiaCreate', function() {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: '/templates/mafia_create_directive.html',
      scope: {
        mafiaData: '=',
        formLegend: '@',
        formSubmit: '&'
      },
      controller: function($scope) {
        $scope.mafiaData = $scope.mafiaData;
      }
    };
  });
};
