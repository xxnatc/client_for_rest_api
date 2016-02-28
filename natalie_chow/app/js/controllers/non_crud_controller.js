module.exports = function(app) {
  app.controller('NonCrudController', ['$scope', '$http', function($scope, $http) {
    $scope.population = {
      towns: 0,
      mafias: 0,
      totalPopulation: 0
    };

    $scope.census = function() {
      $http.get('http://localhost:3000/census')
        .then((res) => {
          $scope.population = res.data;
        }, (err) => {
          console.log(err);
        });
    };
  }]);
};
