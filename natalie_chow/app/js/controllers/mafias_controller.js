module.exports = function(app) {
  app.controller('MafiasController', ['$scope', '$http', 'Resource', function($scope, $http, Resource) {
    var mafiaService = Resource('/mafias');
    $scope.mafias = [];

    $scope.getAll = function() {
      mafiaService.read()
        .then((res) => {
          $scope.mafias = res.data;
        }, (err) => {
          console.log(err);
        });
    };

    function errorMsg(msg) {
      if (msg === 'invalid token')
        return $scope.mafiasWarning = 'Please sign in or register to customize your characters';
    }

    function handleError(err) {
      console.log(err);
      errorMsg(err.data.msg);
    }

    $scope.createMafia = function(newMafia) {
      $scope.mafiasWarning = null;
      if ($scope.token && (typeof newMafia.skill === 'undefined' || newMafia.skill === null))
        newMafia.skill = Math.floor(Math.random() * 101);

      mafiaService.create(newMafia, $scope.token)
        .then((res) => {
          $scope.mafias.push(res.data);
          $scope.newMafia = null;
        }, handleError);
    };

    $scope.deleteMafia = function(mafia) {
      $scope.mafiasWarning = null;
      mafiaService.delete(mafia, $scope.token)
        .then(() => {
          $scope.mafias = $scope.mafias.filter((el) => el._id !== mafia._id);
        }, (err) => {
          console.log(err);
          errorMsg(err.data.msg);
        });
    };

    $scope.updateCheck = function(mafia) {
      if (!$scope.token) return errorMsg('invalid token');
      $scope.mafiasWarning = null;
      mafia.editing = true;
    };

    $scope.updateMafia = function(mafia) {
      mafiaService.update(mafia, $scope.token)
        .then(() => {
          mafia.editing = false;
        }, (err) => {
          console.log(err);
          mafia.editing = false;
          errorMsg(err.data.msg);
        });
    };
  }]);
};
