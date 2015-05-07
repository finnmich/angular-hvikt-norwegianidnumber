# angular-hvikt-norwegianidnumber
Custom angular.js directive for validating norwegian social security numbers.
Add "allowspacesinid" to allow spaces in the id. The value in the model will have the spaces removed.

###Example usage:
```
<form name="form" novalidate>
  <div>
	Id:
	<input type="text" ng-model="fnr" name="fnr" norwegianidnumber allowspacesinid />
	<br />
	Model: {{fnr}}
	<br />
    <span ng-show="form.fnr.$error.norwegianidnumber">Not a valid id!</span>
  </div>  
</form>
```