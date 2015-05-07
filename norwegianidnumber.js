'use strict';

angular.module('hvikt.norwegianidnumber-validator', [])
.directive('norwegianidnumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.norwegianidnumber = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }
        if (attrs.allowspacesinid !== undefined && attrs.allowspacesinid !== 'false') {
          viewValue = viewValue.replace(/\s+/g,'');
        }
        //Check length
        if (viewValue.length !== 11) {
          // it is invalid
          return false;
        }
        //Split to array of integers
        var fnrArray = viewValue.split('');
        for (var index = 0; index < fnrArray.length; index++) {
          fnrArray[index] = parseInt(fnrArray[index],10);          
        }
        //Calculate checknumber 1 (k1)
        //k1 = 11 - ((3 × d1 + 7 × d2 + 6 × m1 + 1 × m2 + 8 × å1 + 9 × å2 + 4 × i1 + 5 × i2 + 2 × i3) mod 11)
        var k1 = 11 - ((3 * fnrArray[0] + 7 * fnrArray[1] + 6 * fnrArray[2] + 1 * fnrArray[3] + 8 * fnrArray[4] + 9 * fnrArray[5] + 4 * fnrArray[6] + 5 * fnrArray[7] + 2 * fnrArray[8]) % 11);
        if (k1 === 11) {
          k1 = 0;
        }
        if (k1 !== fnrArray[9]) {
          return false;
        }
        //Calculate checknumber 2 (k2)
        //k2 = 11 - ((5 × d1 + 4 × d2 + 3 × m1 + 2 × m2 + 7 × å1 + 6 × å2 + 5 × i1 + 4 × i2 + 3 × i3 + 2 × k1) mod 11)
        var k2 = 11 - ((5 * fnrArray[0] + 4 * fnrArray[1] + 3 * fnrArray[2] + 2 * fnrArray[3] + 7 * fnrArray[4] + 6 * fnrArray[5] + 5 * fnrArray[6] + 4 * fnrArray[7] + 3 * fnrArray[8] + 2 * k1) % 11);
        if (k2 === 11) {
          k2 = 0;
        }
        if (k2 !== fnrArray[10]) {
          return false;
        }
        // it is valid
        return true;
      },
      ctrl.$parsers.push(function(value){
        return value.replace(/\s+/g,'');
      });
    }
  };
});