# angular-hvikt-norwegianidnumber
Custom angular.js directive for validating norwegian social security numbers.
Add "allowspacesinid" to allow spaces in the id. The value in the model will have the spaces removed.
Add "checkdate" to check if the dates are valid (Will still accept D-, H- and FH-numbers)


###Example usage:
```
<form name="form" novalidate>
  <div>
	Id:
	<input type="text" ng-model="fnr" name="fnr" norwegianidnumber allowspacesinid checkdate />
	<br />
	Model: {{fnr}}
	<br />
    <span ng-show="form.fnr.$error.norwegianidnumber">Not a valid id!</span>
  </div>  
</form>
```

###To set up environment for testing
```
	npm install karma karma-jasmine karma-phantomjs-launcher --save-dev
	bower update
	karma start
```