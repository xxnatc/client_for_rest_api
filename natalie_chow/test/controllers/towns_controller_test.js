var angular = require('angular');

describe('Towns controller', () => {
  var $httpBackend, $scope, $ControllerConstructor;

  beforeEach(angular.mock.module('salemApp'));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to construct a controller', () => {
    var townsController = $ControllerConstructor('TownsController', {$scope});
    expect(typeof townsController).toBe('object');
    expect(Array.isArray($scope.towns)).toBe(true);
    expect(typeof $scope.getAll).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('TownsController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to make a GET request', () => {
      $httpBackend.expectGET('http://localhost:3000/api/towns')
        .respond(200, [{ name: 'test town' }]);
      $scope.getAll();
      $httpBackend.flush();

      expect($scope.towns.length).toBe(1);
      expect($scope.towns[0].name).toBe('test town');
    });

    it('should be able to make a POST request', () => {
      var reqData = { name: 'request town', braveness: 50 };
      $httpBackend.expectPOST('http://localhost:3000/api/towns', reqData)
        .respond(200, { name: 'response town' });

      $scope.townsWarning = 'some warning';
      $scope.newTown = { name: 'new town' };
      $scope.createTown(reqData);
      $httpBackend.flush();

      expect($scope.towns.length).toBe(1);
      expect($scope.towns[0].name).toBe('response town');
      expect($scope.newTown).toBe(null);
      expect($scope.townsWarning).toBe(null);
    });

    it('should be able to make a DELETE request', () => {
      $httpBackend.expectDELETE('http://localhost:3000/api/towns/testid')
        .respond(200);

      $scope.townsWarning = 'some warning';
      $scope.towns = [{ _id: 'testid' }, { _id: 'thisonestays' }];
      $scope.deleteTown({ _id: 'testid' });
      $httpBackend.flush();

      expect($scope.towns.length).toBe(1);
      expect($scope.townsWarning).toBe(null);
    });

    it('should be able to make a PUT request', () => {
      var reqData = { _id: 'testid', editing: true };
      $httpBackend.expectPUT('http://localhost:3000/api/towns/testid', reqData)
        .respond(200);

      $scope.updateTown(reqData);
      $httpBackend.flush();

      expect(reqData.editing).toBe(false);
    });
  });
});
