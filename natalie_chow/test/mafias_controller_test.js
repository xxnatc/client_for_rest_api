require(__dirname + '/../app/js/client');
var angular = require('angular');
require('angular-mocks');

describe('Mafias controller', () => {
  var $httpBackend, $scope, $ControllerConstructor;

  beforeEach(angular.mock.module('salemApp'));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to construct a controller', () => {
    var mafiasController = $ControllerConstructor('MafiasController', {$scope});
    expect(typeof mafiasController).toBe('object');
    expect(Array.isArray($scope.mafias)).toBe(true);
    expect(typeof $scope.getAll).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('MafiasController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to make a GET request', () => {
      $httpBackend.expectGET('http://localhost:3000/api/mafias')
        .respond(200, [{ name: 'test mafia' }]);
      $scope.getAll();
      $httpBackend.flush();

      expect($scope.mafias.length).toBe(1);
      expect($scope.mafias[0].name).toBe('test mafia');
    });

    it('should be able to make a POST request', () => {
      var reqData = { name: 'request mafia', skill: 77 };
      $httpBackend.expectPOST('http://localhost:3000/api/mafias', reqData)
        .respond(200, { name: 'response mafia' });

      $scope.mafiasWarning = 'some warning';
      $scope.newMafia = { name: 'new mafia' };
      $scope.createMafia(reqData);
      $httpBackend.flush();

      expect($scope.mafias.length).toBe(1);
      expect($scope.mafias[0].name).toBe('response mafia');
      expect($scope.newMafia).toBe(null);
      expect($scope.mafiasWarning).toBe(null);
    });

    it('should be able to make a DELETE request', () => {
      $httpBackend.expectDELETE('http://localhost:3000/api/mafias/testid')
        .respond(200);

      $scope.mafiasWarning = 'some warning';
      $scope.mafias = [{ _id: 'testid' }, { _id: 'thisonestays' }];
      $scope.deleteMafia({ _id: 'testid' });
      $httpBackend.flush();

      expect($scope.mafias.length).toBe(1);
      expect($scope.mafiasWarning).toBe(null);
    });

    it('should be able to make a PUT request', () => {
      var reqData = { _id: 'testid', editing: true };
      $httpBackend.expectPUT('http://localhost:3000/api/mafias/testid', reqData)
        .respond(200);

      $scope.updateMafia(reqData);
      $httpBackend.flush();

      expect(reqData.editing).toBe(false);
    });
  });
});
