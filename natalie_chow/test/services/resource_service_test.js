var angular = require('angular');

describe('Resource service', () => {
  var $httpBackend, Resource;

  beforeEach(angular.mock.module('salemApp'));
  beforeEach(angular.mock.inject(function(_$httpBackend_, _Resource_) {
    $httpBackend = _$httpBackend_;
    Resource = _Resource_;
  }));

  it('should be a service', () => {
    expect(typeof Resource).toBe('function');
  });

  it('should assign something to the resource', () => {
    expect(Resource('/test').baseUrl).toBe('http://localhost:3000/api/test')
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
      $httpBackend.expectGET('http://localhost:3000/api/test')
        .respond(400);
      var called = false;

      Resource('/test').read().catch((err) => {
        expect(typeof err).toBe('object');
        called = true;
      });
      $httpBackend.flush();
      expect(called).toBe(true);
    });

    it('should be able to make a GET request', () => {
      $httpBackend.expectGET('http://localhost:3000/api/test')
        .respond(200, [{ name: 'bilbo' }]);
      var called = false;

      Resource('/test').read().then((res) => {
        expect(res.data[0].name).toBe('bilbo');
        called = true;
      });
      $httpBackend.flush();
      expect(called).toBe(true);
    });

    it('should be able to make a POST request', () => {
      $httpBackend.expectPOST(
        'http://localhost:3000/api/test',
        { name: 'request bilbo' },
        (headers) => headers.token === 'testingtoken'
      ).respond(200, { name: 'response bilbo' });

      var called = false;
      Resource('/test').create({ name: 'request bilbo' }, 'testingtoken')
        .then((res) => {
          expect(res.data.name).toBe('response bilbo');
          called = true;
        });
      $httpBackend.flush();
      expect(called).toBe(true);
    });

    it('should be able to make a PUT request', () => {
      $httpBackend.expectPUT(
        'http://localhost:3000/api/test/7',
        { name: 'test bilbo', _id: 7 },
        (headers) => headers.token === 'testingtoken'
      ).respond(200, { msg: 'update success' });

      var called = false;
      Resource('/test').update({ name: 'test bilbo', _id: 7 }, 'testingtoken')
        .then((res) => {
          expect(res.data.msg).toBe('update success');
          called = true;
        });
      $httpBackend.flush();
      expect(called).toBe(true);
    });

    it('should be able to make a DELETE request', () => {
      $httpBackend.expectDELETE(
        'http://localhost:3000/api/test/12',
        (headers) => headers.token === 'testingtoken'
      ).respond(200, { msg: 'delete success' });

      var called = false;
      Resource('/test').delete({ _id: 12 }, 'testingtoken')
        .then((res) => {
          expect(res.data.msg).toBe('delete success');
          called = true;
        });
      $httpBackend.flush();
      expect(called).toBe(true);
    });
  });
});
