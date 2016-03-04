var angular = require('angular');

describe('Auth controller', () => {
  var $httpBackend, $scope, $ControllerConstructor;

  beforeEach(angular.mock.module('salemApp'));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to construct a controller', () => {
    var authController = $ControllerConstructor('AuthController', {$scope});
    expect(typeof authController).toBe('object');
    expect(typeof $scope.logout).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('AuthController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to send a signup request', () => {
      $httpBackend.expectPOST(
        'http://localhost:3000/api/signup',
        { email: 'test@salmons.com' }
      ).respond(200, { token: 'testtoken' });

      $httpBackend.expectGET(
        'http://localhost:3000/api/currentuser',
        {
          'token': 'testtoken',
          'Accept': 'application/json, text/plain, */*'
        }
      ).respond(200, { username: 'test username' });

      $scope.authWarning = 'some warning';
      $scope.signup({ email: 'test@salmons.com' });
      $httpBackend.flush();

      expect($scope.username).toBe('test username');
      expect($scope.authWarning).toBe(null);
    });

    it('should be able to send a signin request', () => {
      $httpBackend.expectGET(
        'http://localhost:3000/api/signin',
        {
          'Authorization': 'Basic ' + btoa('test@salmons.com:bearbear'),
          'Accept': 'application/json, text/plain, */*'
        }
      ).respond(200, { token: 'testtoken' });

      $httpBackend.expectGET(
        'http://localhost:3000/api/currentuser',
        {
          'token': 'testtoken',
          'Accept': 'application/json, text/plain, */*'
        }
      ).respond(200, { username: 'test username' });

      $scope.authWarning = 'some warning';
      $scope.signin({ email: 'test@salmons.com', password: 'bearbear' });
      $httpBackend.flush();

      expect($scope.username).toBe('test username');
      expect($scope.authWarning).toBe(null);
    });
  });
});
