var angular = require('angular');
var template = require('../../app/templates/mafia_display_directive.html');

describe('Mafia display directive', () => {
  var $compile, $rootScope, $httpBackend;

  beforeEach(angular.mock.module('salemApp'));
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should be able to load and display data', () => {
    $httpBackend.whenGET('/templates/mafia_display_directive.html')
      .respond(200, template);

    var element = $compile('<tr mafia-display data-mafia-data="{name: \'test mafia\'}"></tr>')($rootScope);

    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('test mafia');
  });

  it('should be able to display editing form', () => {
    $httpBackend.whenGET('/templates/mafia_display_directive.html')
      .respond(200, template);

    var element = $compile('<tr mafia-display data-mafia-data="{name: \'test mafia\', editing: true}"></tr>')($rootScope);

    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('<input');
    expect(element.html()).toContain('<span class="glyphicon glyphicon-floppy-disk"></span>');
  });

  it('should able to call the showForm function', () => {
    var testScope = $rootScope.$new();
    $httpBackend.whenGET('/templates/mafia_display_directive.html')
      .respond(200, template);

    testScope.mafiaData = { name: 'inside scope' };
    testScope.testShow = function(input) {
      expect(input.name).toBe('call from scope');
      input.editing = true;
      testScope.mafiaData = input;
    };

    var element = $compile('<tr mafia-display data-mafia-data="{name: \'inside directive\'}" data-show-form=testShow><tr>')(testScope);

    $httpBackend.flush();
    $rootScope.$digest();

    element.isolateScope().showForm(testScope)({ name: 'call from scope' });
    expect(testScope.mafiaData.editing).toBe(true);
  });

  it('should able to call the updateChar function', () => {
    var testScope = $rootScope.$new();
    $httpBackend.whenGET('/templates/mafia_display_directive.html')
      .respond(200, template);

    testScope.mafiaData = { name: 'inside scope' };
    testScope.testUpdate = function(input) {
      expect(input.name).toBe('call from scope');
      input.editing = false;
      testScope.mafiaData = input;
    };

    var element = $compile('<tr mafia-display data-mafia-data="{name: \'inside directive\', editing: true}" data-update-char=testUpdate><tr>')(testScope);

    $httpBackend.flush();
    $rootScope.$digest();

    element.isolateScope().updateChar(testScope)({ name: 'call from scope', editing: true });
    expect(testScope.mafiaData.editing).toBe(false);
  });

  it('should able to call the deleteChar function', () => {
    var testScope = $rootScope.$new();
    $httpBackend.whenGET('/templates/mafia_display_directive.html')
      .respond(200, template);

    testScope.mafiaData = { name: 'inside scope' };
    testScope.testDelete = function(input) {
      expect(input.name).toBe('call from scope');
      testScope.mafiaData = input;
    };

    var element = $compile('<tr mafia-display data-mafia-data="{name: \'inside directive\'}" data-delete-char=testDelete><tr>')(testScope);

    $httpBackend.flush();
    $rootScope.$digest();

    element.isolateScope().deleteChar(testScope)({ name: 'call from scope' });
    expect(testScope.mafiaData.name).toBe('call from scope');
  });
});
