module.exports = function(app) {
  app.directive('warning', function() {
    return {
      restrict: 'EAC',
      templateUrl: '/templates/warning_directive.html',
      scope: {
        warningText: '='
      }
    };
  });
};
