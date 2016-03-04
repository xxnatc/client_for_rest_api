module.exports = function(app) {
  app.controller('MafiasController', ['$scope', '$http', 'salemAuth', 'Resource', function($scope, $http, salemAuth, Resource) {
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
      if (salemAuth.getToken() && (typeof newMafia.skill === 'undefined' || newMafia.skill === null))
        newMafia.skill = Math.floor(Math.random() * 101);

      mafiaService.create(newMafia)
        .then((res) => {
          $scope.mafias.push(res.data);
          $scope.newMafia = null;
        }, handleError);
    };

    $scope.deleteMafia = function(mafia) {
      $scope.mafiasWarning = null;
      mafiaService.delete(mafia)
        .then(() => {
          $scope.mafias = $scope.mafias.filter((el) => el._id !== mafia._id);
        }, (err) => {
          console.log(err);
          errorMsg(err.data.msg);
        });
    };

    $scope.updateCheck = function(mafia) {
      if (!salemAuth.getToken()) return errorMsg('invalid token');
      $scope.mafiasWarning = null;
      mafia.editing = true;
    };

    $scope.updateMafia = function(mafia) {
      mafiaService.update(mafia)
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
