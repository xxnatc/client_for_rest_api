var angular = require('angular');
var template = require('../../app/templates/town_create_directive.html');

describe('Town create directive', () => {
  var $compile, $rootScope, $httpBackend;

  beforeEach(angular.mock.module('salemApp'));
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive', () => {
    $httpBackend.whenGET('/templates/town_create_directive.html')
      .respond(200, template);

    var element = $compile('<town-create data-form-legend="rendering test"></town-create>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('rendering test');
  });

  it('should able to call the submit function being passed in', () => {
    var testScope = $rootScope.$new();
    $httpBackend.whenGET('/templates/town_create_directive.html')
      .respond(200, template);

    testScope.townData = { name: 'inside scope' };
    testScope.testSubmit = function(input) {
      expect(input.name).toBe('call from scope');
      testScope.townData = input;
    };

    var element = $compile('<town-create data-town-data="{name: \'inside directive\'}"" data-form-submit=testSubmit><town-create>')(testScope);

    $httpBackend.flush();
    $rootScope.$digest();

    element.isolateScope().formSubmit(testScope)({ name: 'call from scope' });
    expect(testScope.townData.name).toBe('call from scope');
  });
});
