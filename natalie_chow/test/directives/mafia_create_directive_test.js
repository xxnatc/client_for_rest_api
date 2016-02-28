var angular = require('angular');
var template = require('../../app/templates/mafia_create_directive.html');

describe('Town create directive', () => {
  var $compile, $rootScope, $httpBackend;

  beforeEach(angular.mock.module('salemApp'));
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive', () => {
    $httpBackend.whenGET('/templates/mafia_create_directive.html')
      .respond(200, template);

    var element = $compile('<mafia-create data-form-legend="rendering test"></mafia-create>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('rendering test');
  });

  it('should able to call the submit function being passed in', () => {
    var testScope = $rootScope.$new();
    $httpBackend.whenGET('/templates/mafia_create_directive.html')
      .respond(200, template);

    testScope.mafiaData = { name: 'inside scope' };
    testScope.testSubmit = function(input) {
      expect(input.name).toBe('call from scope');
      testScope.mafiaData = input;
    };

    var element = $compile('<mafia-create data-mafia-data="{name: \'inside directive\'}"" data-form-submit=testSubmit><mafia-create>')(testScope);

    $httpBackend.flush();
    $rootScope.$digest();

    element.isolateScope().formSubmit(testScope)({ name: 'call from scope' });
    expect(testScope.mafiaData.name).toBe('call from scope');
  });
});
