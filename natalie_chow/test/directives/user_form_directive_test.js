var angular = require('angular');
var template = require('../../app/templates/user_form_directive.html');

describe('User form directive', () => {
  var $compile, $rootScope, $httpBackend;

  beforeEach(angular.mock.module('salemApp'));
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive', () => {
    $httpBackend.whenGET('/templates/user_form_directive.html')
      .respond(200, template);

    var element = $compile('<user-form data-form-legend="rendering test"></user-form>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('rendering test');
  });

  it('should able to call the submit function being passed in', () => {
    var testScope = $rootScope.$new();
    $httpBackend.whenGET('/templates/user_form_directive.html')
      .respond(200, template);

    testScope.user = { email: 'inside scope' };
    testScope.testSubmit = function(input) {
      expect(input.email).toBe('call from scope');
      testScope.user = input;
    };

    var element = $compile('<user-form data-user="{email: \'inside directive\'}"" data-form-submit=testSubmit><user-form>')(testScope);

    $httpBackend.flush();
    $rootScope.$digest();

    element.isolateScope().formSubmit(testScope)({ email: 'call from scope' });
    expect(testScope.user.email).toBe('call from scope');
  });
});
