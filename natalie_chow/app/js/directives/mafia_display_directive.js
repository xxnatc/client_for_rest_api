module.exports = function(app) {
  app.directive('mafiaDisplay', function() {
    return {
      // use as attribute without replacement to overcome issue in <table> misalignment
      restrict: 'A',
      templateUrl: '/templates/mafia_display_directive.html',
      scope: {
        mafiaData: '=',
        showForm: '&',
        updateChar: '&',
        deleteChar: '&'
      },
      controller: function($scope) {
        $scope.mafiaData = $scope.mafiaData;
      }
    };
  });
};
