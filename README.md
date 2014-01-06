# jQuery Validator

The powerful jQuery plugin that help validates the forms on pages. <a href="https://github.com/cqiannum/jquery-validator">Project page and demos</a><br />
Download: <a href="https://github.com/cqiannum/jquery-validator">jquery-validator-master.zip</a>

***

## Features

* **Multiple language support** — The validator supports multiple languages validation such as English and Chinese. 
* **Custom validation rules support** — customs rules are supported in validator.
* **The entire form validation support** — the entire form validation is supported.
* **The validation of a single element support** — the single element is supported.
* **AJAXed validator support** — ajax load content support
* **Custom error messages support** — According to the demand for custom error messages.
* **Flexible error message displayed** — two types of error messages display.
* **Lightweight size** — 1 kb gzipped

## Dependencies
* <a href="http://jquery.com/" target="_blank">jQuery 1.83+</a>

## Usage

Import this libraries:
* jQuery
* jquery-validator.js

And CSS:
* jquery-validator.css 


Create base html element:
```html
<form action="" method="post" id="validate_form">
	<table>
		<thead></thead>
		<tbody>
			<tr>
				<th>User:</th>
				<td><input type="text" name="username" /></td>
			</tr>
			<tr>
				<th>Age:</th>
				<td><input type="text" name="age" /></td>
			</tr>
			<tr>
				<th>Email:</th>
				<td><input type="text" name="email" /></td>
			</tr>
			<tr>
				<th>Password:</th>
				<td><input type="password" name="password" /></td>
			</tr>
			<tr>
				<th>CheckPass:</th>
				<td><input type="password" name="checkpassword" /></td>
			</tr>
			<tr>
				<th>&nbsp;&nbsp;&nbsp;&nbsp;</th>
				<td><input type="submit" name="submit" value="submit" /></td>
			</tr>
		</tbody>
	</table>
</form>
```

Initialize validator:
```javascript
var inputs1 = [{name: "username", type: "english"}, { name: "email",	type: "email"}, { name: "password", type: "password"}, { name: "checkpassword", type: "equal", equalTo: 'password'}, {name:"age",type:"age", between:[18,78]}];
$("#validate_form").validator({inputs:inputs1});
```

## Settings

```javascript
{   

    // Optional property, Set a namespace for css class
    namespace: 'validator',
    
    //Optional property, set the display mode of error message, can be set 'floatleft' 、'slidedown' 、'inline'.
    tipShow: 'floatleft', 
	
	//Optional property, set the minmum value allowed to enter
	min: 6,   

	//optional property, set the maxnum value allowed to enter              
    max: 12,                

	//Optional property, set the minmum number of characters that allowed to enter
    minLength: 3,           

	//Optional property, set the maxmum number of characters that allowed to enter
    maxlength: 8,           

    //Optional property, The default validation rules.
     regulars: {
            "urlstrict": /^(https?|s?ftp|git):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
            "email": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))){2,6}$/,
            "number": /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/,
            "phone": /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/,
            "date": /^(\d{4})\D?(0[1-9]|1[0-2])\D?([12]\d|0[1-9]|3[01])$/,
            "password": /^[a-z0-9_-]{6,18}$/,
            "chinese": /^[\u0391-\uFFE5]+$/,
            "english": /^[A-Za-z]+$/,
            "digits": /^\d+$/,
            "alphanum": /^\w+$/
        },

	//Optional property, The default message when focus.
	focusMsg: {
            english: "Only enter English characters as the user name",
            chinese: "Only enter Chinese characters as the user name",
            email: "Enter a useful email",
            password: "Enter (1-9/A-z/_)",
            eq: "The same password as above",
            age: "1~100",
            date: "Should like(YYYY-MM-DD)",
            number: "All number",
            min: "Greater than 6",
            max: "Less than 12",
            minlength: "The number of characters input should be more then 3",
            maxlength: "The number of characters input should be smaller than 8",
            notBlank: "You can enter any characters you like",
            phone: "Please enter your telephone number"
       },
	
	////Optional property, The default error message.
	errorMsg: {
            english: "Invalid english character",
            chinese: "Invalid chinese character",
            email: "Invalid email, Please enter a right email",
            password: "Invalid password",
            eq: "Two password are deferent",
            age: "Invalid age",
            number: "Invalid number",
            date: "Should like(YYYY-MM-DD)",
            min: "too less",
            max: "too greate",
            minlength: "The number of characters are too little",
            maxlength: "The number of characters are too many",
            notBlank: "The input box cannot be empty",
            phone: "Invalid teliphone number",
            ajax: "The username is exists"
        },

    //Optional property, store the detail messages of inputs
    inputs: [] 

   
}
```

## Public methods

jquery popup has different methods , we can use it as below :
```javascript
// to destroy
$("#validate_form").validator("success");
$("#validate_form").validator("error");
$("#validate_form").validator("tipDispear");
$("#validate_form").validator("destroy");

```

## Event / Callback

* <code>validator::focus</code>: trigger when the current input box gain focus.
* <code>validator::blur</code>: trigger when the current input box lose focus.
* <code>validator::submit</code>: trigger when form is going to submit.

how to use event:
```javascript
$(document).on('validator::focus', function(event,instance) {
    // instance means current validator instance 
    // some stuff
});
```

## Browser support
jquery-validator is verified to work in Internet Explorer 7+, Firefox 2+, Opera 9+, Google Chrome and Safari browsers. Should also work in many others.

Mobile browsers (like Opera mini, Chrome mobile, Safari mobile, Android browser and others) is coming soon.

## Changes

| Version | Notes                                                            |
|---------|------------------------------------------------------------------|
|   0.1.x | ([compare][compare-1.1]) add ajax function                   |
|     ... | ...                                                              |

[compare-1.1]: https://github.com/cqiannum/jquery-validator/compare/v1.1.0...v1.2.0

## Author
[cqiannum](https://github.com/cqiannum)

## License
jQuery-validator plugin is released under the <a href="https://github.com/cqiannum/jquery-validator/blob/master/LICENCE.GPL" target="_blank">GPL licence</a>.


