require(__dirname + '/../app/js/client');
var angular = require('angular');
require('angular-mocks');

describe('Users controller', () => {
  var $httpBackend, $scope, $ControllerConstructor;

  beforeEach(angular.mock.module('salemApp'));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to construct a controller', () => {
    var usersController = $ControllerConstructor('UsersController', {$scope});
    expect(typeof usersController).toBe('object');
    expect(typeof $scope.logout).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('UsersController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to send a signup request', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/signup', { email: 'test@salmons.com' })
        .respond(200, { token: 'testtoken' });
      $scope.authWarning = 'some warning';
      $scope.signup({ email: 'test@salmons.com' });
      $httpBackend.flush();

      expect($scope.token).toBe('testtoken');
      expect($scope.authWarning).toBe(null);
    });

    it('should be able to send a signin request', () => {
      $httpBackend.expectGET('http://localhost:3000/api/signin', {
        'Authorization': 'Basic ' + btoa('test@salmons.com:bearbear'),
        'Accept': 'application/json, text/plain, */*'
      })
        .respond(200, { token: 'testtoken' });
      $scope.authWarning = 'some warning';
      $scope.signin({ email: 'test@salmons.com', password: 'bearbear' });
      $httpBackend.flush();

      expect($scope.token).toBe('testtoken');
      expect($scope.authWarning).toBe(null);
    });
  });
});
