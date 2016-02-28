var angular = require('angular');

describe('User service', () => {
  var $httpBackend, User;

  beforeEach(angular.mock.module('salemApp'));
  beforeEach(angular.mock.inject(function(_$httpBackend_, _User_) {
    $httpBackend = _$httpBackend_;
    User = _User_;
  }));

  it('should be a service', () => {
    expect(typeof User).toBe('function');
  });

  it('should be able to initialize the resource', () => {
    expect(User().baseUrl).toBe('http://localhost:3000/api');
  });

  describe('an instance of resource', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to handle an error', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/signup')
        .respond(400);

      var called = false;
      User().signup().catch((err) => {
        expect(typeof err).toBe('object');
        called = true;
      });
      $httpBackend.flush();
      expect(called).toBe(true);
    });

    it('should be able to signup', () => {
      $httpBackend.expectPOST(
        'http://localhost:3000/api/signup',
        {email: 'bear@salmons.com', password: 'password'}
      ).respond(200, { token: 'testingresponsetoken' });

      var called = false;
      User().signup({email: 'bear@salmons.com', password: 'password'}).then((res) => {
        expect(res.data.token).toBe('testingresponsetoken');
        called = true;
      });
      $httpBackend.flush();
      expect(called).toBe(true);
    });
  });

  it('should be able to signin', () => {
    var authStr = 'Basic ' + btoa('bear@salmons.com:password');
    $httpBackend.expectGET(
      'http://localhost:3000/api/signin',
      (headers) => headers.Authorization === authStr
    ).respond(200, { token: 'testingresponsetoken' });

    var called = false;
    User().signin({email: 'bear@salmons.com', password: 'password'}).then((res) => {
      expect(res.data.token).toBe('testingresponsetoken');
      called = true;
    });
    $httpBackend.flush();
    expect(called).toBe(true);
  });
});
