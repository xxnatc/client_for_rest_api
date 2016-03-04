module.exports = function(app) {
  app.directive('townDisplay', function() {
    return {
      // use as attribute without replacement to overcome issue in <table> misalignment
      restrict: 'A',
      templateUrl: '/templates/town_display_directive.html',
      scope: {
        townData: '=',
        showForm: '&',
        updateChar: '&',
        deleteChar: '&'
      },
      controller: function($scope) {
        $scope.townData = $scope.townData;
      }
    };
  });
};
