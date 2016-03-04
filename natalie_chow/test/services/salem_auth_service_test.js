var angular = require('angular');

describe('Auth service', () => {
  var $httpBackend, $window, salemAuth;

  beforeEach(angular.mock.module('salemApp'));
  beforeEach(angular.mock.inject(function(_$httpBackend_, _$window_, _salemAuth_) {
    $httpBackend = _$httpBackend_;
    $window = _$window_;
    salemAuth = _salemAuth_;
  }));

  it('should be a singleton service', () => {
    expect(typeof salemAuth).toBe('object');
  });

  describe('individual methods', () => {
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
      salemAuth.signUp().catch((err) => {
        expect(typeof err).toBe('object');
        called = true;
      });
      $httpBackend.flush();
      expect(called).toBe(true);
    });

    it('should be able to sign up', () => {
      $httpBackend.expectPOST(
        'http://localhost:3000/api/signup',
        { email: 'bear@salmons.com', password: 'password' }
      ).respond(200, { token: 'testingresponsetoken' });

      var called = false;
      salemAuth.signUp({email: 'bear@salmons.com', password: 'password'})
        .then((res) => {
          expect($window.localStorage.salemToken).toBe('testingresponsetoken');
          called = true;
        });

      $httpBackend.flush();
      expect(called).toBe(true);
    });

    it('should be able to sign in', () => {
      $httpBackend.expectGET(
        'http://localhost:3000/api/signin',
        (headers) => headers.Authorization === 'Basic ' + btoa('bear@salmons.com:password')
      ).respond(200, { token: 'testingresponsetoken' });

      var called = false;
      salemAuth.signIn({email: 'bear@salmons.com', password: 'password'})
        .then((res) => {
          expect($window.localStorage.salemToken).toBe('testingresponsetoken');
          called = true;
        });

      $httpBackend.flush();
      expect(called).toBe(true);
    });

    describe('that requires a token', () => {
      var testToken;
      beforeEach(() => {
        testToken = salemAuth.getToken() || 'tokenfortest';
      });

      it('should be able to get token', () => {
        expect(typeof testToken).toBe('string');
      });

      it('should be able to get username', () => {
        $httpBackend.expectGET(
          'http://localhost:3000/api/currentuser',
          (headers) => headers.token === testToken
        ).respond(200, { username: 'test username' });

        var called = false;
        salemAuth.getUsername()
        .then((res) => {
          expect(res.data.username).toBe('test username');
          called = true;
        });

        $httpBackend.flush();
        expect(called).toBe(true);
      });

      it('should be able to sign out', (done) => {
        salemAuth.signOut()
          .then(() => {
            expect($window.localStorage.salemToken).toBe('null');
            expect(salemAuth.getToken()).toBe('null');
            done();
          });
      });
    });

  });
});
