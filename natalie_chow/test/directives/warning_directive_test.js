var angular = require('angular');
var template = require('../../app/templates/warning_directive.html');

describe('Warning directive', () => {
  var $compile, $rootScope, $httpBackend;

  beforeEach(angular.mock.module('salemApp'));
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive from literal data', () => {
    $httpBackend.whenGET('/templates/warning_directive.html')
      .respond(200, template);

    var element = $compile('<warning data-warning-text="\'testwarning\'"></warning>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('testwarning');
  });

  it('should load the directive with scope data', () => {
    var testScope = $rootScope.$new();
    $httpBackend.whenGET('/templates/warning_directive.html')
      .respond(200, template);

    testScope.testWarning = 'warning from scope';

    var element = $compile('<warning data-warning-text="testWarning"></warning>')(testScope);

    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('warning from scope');
  });
});
