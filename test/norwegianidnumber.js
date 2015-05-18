'use strict';

describe('Directive: norwegianidnumber', function () {

  // load the controller's module
  beforeEach(module('hvikt.norwegianidnumber-validator'));

  var scope, form;
  
  var validFnrList = ['03067829440',
    '10047333984',
    '27124814311',
    '17058921998',
    '12059666906',
    '21107148628',
    '13037913124',
    '06018733364',
    '19025246635',
    '31086029157',
    '02027708954',
    '13100490670',
    '30115822590',
    '19057302448',
    '07099879518',
    '08018223466',
    '22127442081',
    '29102944281',
    '31039005568',
    '30075806236',
    '30039624938',
    '04041434029',
    '14102102569',
    '13078729761',
    '03119589095',
    '01129330224',
    '22105326363',
    '17036824492',
    '05101645187',
    '02054048117',
    '26059744584',
    '07052533605',
    '02025200112',
    '19110526175',
    '05055337197',
    '19110877792',
    '12036125789',
    '19078432384',
    '09067531865',
    '27128306116',
    '05071717889',
    '13054512605',
    '27016744498',
    '22097511202',
    '30060565283',
    '02020101620',
    '27110209741',
    '14078830795',
    '17039231468',
    '07045412274',
    '04080184021',
    '03029708354',
    '09061258857',
    '03128724469',
    '23123536592',
    '25015916365',
    '11012749629',
    '15105809597',
    '24022109045',
    '29069631299',
    '28118741546',
    '22095705166',
    '28077208390',
    '21033132066',
    '14060740640',
    '22118744830',
    '18111406894',
    '10020554172',
    '26098511287',
    '09070679954',
    '25115414731',
    '14124100756',
    '16056004118',
    '23015029005',
    '16027522509',
    '29030322043',
    '30072206165',
    '07028740128',
    '12080561359',
    '23096735383',
    '03094344823',
    '04101931469',
    '27108215556',
    '21054347550',
    '30120035602',
    '17067405870',
    '14115304314',
    '22038117088',
    '06098903923',
    '17107038345',
    '16029982353',
    '18105713432',
    '13088636494',
    '16022508060',
    '11098224116',
    '10037844220',
    '02043332670',
    '07061216655',
    '17057343133',
    '26121441194'];
    
  var testActors = [
    '15076500565',
    '21016400952',
    '12057900499',
    '13116900216',
    '14019800513',
    '70019950032',
    '05073500186',
    '02039000183',
    '08077000292',
    '15040650560',
    '21030550231',
    '12050050295',
    '29019900248',
    '19079800468',
    '04129700489',
    '11079500412',
    '80001443511',
    '80008117075',
    '80008621423',
    '80009001259',
    '20086600138',
    '03117000205'
  ];
  
  var inValidDateValidChecksum = [
    '12345678911',
    '22222212301'
  ];
  
  var testActorsWithSpaces = [
    '15 076 50   0565',
    '21 01 640 0952',
    '1205 790 0499',
    '131 169 00216',
    '14  019800513',
    '70019 950032',
    '050 73500186',
    '0 2039000183',
    '08077 000292',
    '150  40650560',
    '2103 0550231',
    '120500 50295',
    '290 19900248',
    '1907 9800468',
    '041297 00489',
    '11 079 500412',
    '800 01443511',
    '800 08117075',
    ' 8 0 0 0 8 6 21423',
    '80009001259  ',
    '  20086600138',
    '03117   000205'
  ];
  
  describe('without allow spaces', function(){
      
    // Initialize mock scope and element
    beforeEach(inject(function ($compile, $rootScope) {
      scope = $rootScope.$new();
      var element = angular.element(
        '<form name="form">' +
        '<input type="text" ng-model="model.someid" name="someid" norwegianidnumber />' +
        '</form>'
      );
  
    	scope.model = { someid : null };
    	$compile(element)(scope);
    	form = scope.form;
    }));
    
    it('should return true when empty', function (){
      form.someid.$setViewValue('');
      scope.$digest();
      expect(form.someid.$valid).toBe(true);
    });
  
    it('should return false with one digit', function () {
      form.someid.$setViewValue('5');
      scope.$digest();
      expect(form.someid.$valid).toBe(false);
    });
    
    it('should return false with character string', function () {
      form.someid.$setViewValue('test');
      scope.$digest();
      expect(form.someid.$valid).toBe(false);
    });
    
    it('should return true with valid ids', function () {
      var index;
      var element;
      for (index = 0; index < validFnrList.length; index++) {
        element = validFnrList[index];
        form.someid.$setViewValue(element);
        scope.$digest();
        expect(scope.model.someid).toBe(element);
        expect(form.someid.$valid).toBe(true);
      }
      for (index = 0; index < testActors.length; index++) {
        element = testActors[index];
        form.someid.$setViewValue(element);
        scope.$digest();
        expect(scope.model.someid).toBe(element);
        expect(form.someid.$valid).toBe(true);
      }
    });
    
    it('should return false with spaces in number', function (){
      var index;
      for (index = 0; index < testActorsWithSpaces.length; index++) {
        var element = testActorsWithSpaces[index];
        form.someid.$setViewValue(element);
        scope.$digest();
        expect(form.someid.$valid).toBe(false);
      }
    });
    
    it('should return true even if date is incorrect with checkdate disabled', function(){
      var index;
      for (index = 0; index < inValidDateValidChecksum.length; index++) {
        var element = inValidDateValidChecksum[index];
        form.someid.$setViewValue(element);
        scope.$digest();
        expect(scope.model.someid).toBe(element);
        expect(form.someid.$valid).toBe(true);
      }
    });
  });
  
  describe('with allow spaces', function(){
    // Initialize mock scope and element
    beforeEach(inject(function ($compile, $rootScope) {
      scope = $rootScope.$new();
      var element = angular.element(
        '<form name="form">' +
        '<input type="text" ng-model="model.someid" name="someid" norwegianidnumber allowspacesinid />' +
        '</form>'
      );
  
    	scope.model = { someid : null };
    	$compile(element)(scope);
    	form = scope.form;
    }));
    
    it('should return true with spaces in number', function (){
      var index;
      for (index = 0; index < testActorsWithSpaces.length; index++) {
        var element = testActorsWithSpaces[index];
        form.someid.$setViewValue(element);
        scope.$digest();
        //Space should be stripped in model view
        expect(scope.model.someid).toBe(element.replace(/\s+/g,''));
        expect(form.someid.$valid).toBe(true);
      }
    });
  });
  
  describe('with check date enabled', function(){
    // Initialize mock scope and element
    beforeEach(inject(function ($compile, $rootScope) {
      scope = $rootScope.$new();
      var element = angular.element(
        '<form name="form">' +
        '<input type="text" ng-model="model.someid" name="someid" norwegianidnumber checkdate />' +
        '</form>'
      );
  
    	scope.model = { someid : null };
    	$compile(element)(scope);
    	form = scope.form;
    }));
    
    it('should return false if date is incorrect', function(){
      var index;
      for (index = 0; index < inValidDateValidChecksum.length; index++) {
        var element = inValidDateValidChecksum[index];
        form.someid.$setViewValue(element);
        scope.$digest();
        expect(form.someid.$valid).toBe(false);
      }
    });
    
    it('should still accept D-numbers, H-numbers and FH-numbers', function(){
      var index;
      var element;
      for (index = 0; index < validFnrList.length; index++) {
        element = validFnrList[index];
        form.someid.$setViewValue(element);
        scope.$digest();
        expect(scope.model.someid).toBe(element);
        expect(form.someid.$valid).toBe(true);
      }
      for (index = 0; index < testActors.length; index++) {
        element = testActors[index];
        form.someid.$setViewValue(element);
        scope.$digest();
        expect(scope.model.someid).toBe(element);
        expect(form.someid.$valid).toBe(true);
      }
    });
  });  
});
