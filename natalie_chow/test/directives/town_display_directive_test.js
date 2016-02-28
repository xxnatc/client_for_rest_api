var angular = require('angular');
var template = require('../../app/templates/town_display_directive.html');

describe('Town display directive', () => {
  var $compile, $rootScope, $httpBackend;

  beforeEach(angular.mock.module('salemApp'));
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should be able to load and display data', () => {
    $httpBackend.whenGET('/templates/town_display_directive.html')
      .respond(200, template);

    var element = $compile('<tr town-display data-town-data="{name: \'test town\'}"></tr>')($rootScope);

    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('test town');
  });

  it('should be able to display editing form', () => {
    $httpBackend.whenGET('/templates/town_display_directive.html')
      .respond(200, template);

    var element = $compile('<tr town-display data-town-data="{name: \'test town\', editing: true}"></tr>')($rootScope);

    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('<input');
    expect(element.html()).toContain('<span class="glyphicon glyphicon-floppy-disk"></span>');
  });

  it('should able to call the showForm function', () => {
    var testScope = $rootScope.$new();
    $httpBackend.whenGET('/templates/town_display_directive.html')
      .respond(200, template);

    testScope.townData = { name: 'inside scope' };
    testScope.testShow = function(input) {
      expect(input.name).toBe('call from scope');
      input.editing = true;
      testScope.townData = input;
    };

    var element = $compile('<tr town-display data-town-data="{name: \'inside directive\'}" data-show-form=testShow><tr>')(testScope);

    $httpBackend.flush();
    $rootScope.$digest();

    element.isolateScope().showForm(testScope)({ name: 'call from scope' });
    expect(testScope.townData.editing).toBe(true);
  });

  it('should able to call the updateChar function', () => {
    var testScope = $rootScope.$new();
    $httpBackend.whenGET('/templates/town_display_directive.html')
      .respond(200, template);

    testScope.townData = { name: 'inside scope' };
    testScope.testUpdate = function(input) {
      expect(input.name).toBe('call from scope');
      input.editing = false;
      testScope.townData = input;
    };

    var element = $compile('<tr town-display data-town-data="{name: \'inside directive\', editing: true}" data-update-char=testUpdate><tr>')(testScope);

    $httpBackend.flush();
    $rootScope.$digest();

    element.isolateScope().updateChar(testScope)({ name: 'call from scope', editing: true });
    expect(testScope.townData.editing).toBe(false);
  });

  it('should able to call the deleteChar function', () => {
    var testScope = $rootScope.$new();
    $httpBackend.whenGET('/templates/town_display_directive.html')
      .respond(200, template);

    testScope.townData = { name: 'inside scope' };
    testScope.testDelete = function(input) {
      expect(input.name).toBe('call from scope');
      testScope.townData = input;
    };

    var element = $compile('<tr town-display data-town-data="{name: \'inside directive\'}" data-delete-char=testDelete><tr>')(testScope);

    $httpBackend.flush();
    $rootScope.$digest();

    element.isolateScope().deleteChar(testScope)({ name: 'call from scope' });
    expect(testScope.townData.name).toBe('call from scope');
  });
});
