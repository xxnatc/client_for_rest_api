var angular = require('angular');

describe('Non-CRUD controller', () => {
  var $httpBackend, $scope, $ControllerConstructor;

  beforeEach(angular.mock.module('salemApp'));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to construct a controller', () => {
    var nonCrudController = $ControllerConstructor('NonCrudController', {$scope});
    expect(typeof nonCrudController).toBe('object');
    expect(typeof $scope.census).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('NonCrudController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to retrieve the current population', () => {
      $httpBackend.expectGET('http://localhost:3000/census')
        .respond(200, { towns: 2 });
      $scope.population = {};
      $scope.census();
      $httpBackend.flush();

      expect($scope.population.towns).toBe(2);
    });
  });
});
