module.exports = function(app) {
  app.controller('TownsController', ['$scope', '$http', 'salemAuth', 'Resource', function($scope, $http, salemAuth, Resource) {
    var townService = Resource('/towns');
    $scope.towns = [];

    $scope.getAll = function() {
      townService.read()
        .then((res) => {
          $scope.towns = res.data;
        }, (err) => {
          console.log(err);
        });
    };

    function errorMsg(msg) {
      if (msg === 'invalid token')
        return $scope.townsWarning = 'Please sign in or register to customize your characters';
    }

    function handleError(err) {
      console.log(err);
      errorMsg(err.data.msg);
    }

    $scope.createTown = function(newTown) {
      $scope.townsWarning = null;
      if (salemAuth.getToken() && (typeof newTown.braveness === 'undefined' || newTown.braveness === null))
        newTown.braveness = Math.floor(Math.random() * 101);

      townService.create(newTown)
        .then((res) => {
          $scope.towns.push(res.data);
          $scope.newTown = null;
        }, handleError);
    };

    $scope.deleteTown = function(town) {
      $scope.townsWarning = null;
      townService.delete(town)
        .then(() => {
          $scope.towns = $scope.towns.filter((el) => el._id !== town._id);
        }, handleError);
    };

    $scope.updateCheck = function(town) {
      if (!salemAuth.getToken()) return errorMsg('invalid token');
      $scope.townsWarning = null;
      town.editing = true;
    };

    $scope.updateTown = function(town) {
      townService.update(town)
        .then(() => {
          town.editing = false;
        }, (err) => {
          town.editing = false;
          handleError(err);
        });
    };
  }]);
};
