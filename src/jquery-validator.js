/*
 * jquery-validator
 * https://github.com/cqiannum/jquery-validator
 *
 * Copyright (c) 2013 cqian
 * Licensed under the MIT license.
 */

(function($) {
    "use strict";

    var Validator = $.validator = function(element, options){

        var self = this;

        this.element = element;
        this.$element = $(element);
        this.options = $.extend(true, {}, Validator.defaults, options);
        this.namespace = this.options.namespace;
        this.tipShow = this.options.tipShow;
        this.min = this.options.min;
        this.max = this.options.max;
        this.minLength = this.options.minLength;
        this.maxlength = this.options.maxlength;

         //get the validate regulars
        this.regulars = this.options.regulars;

        //store outer inputs
        this.inputs = {};
        $.each(this.options.inputs, function(i, n) {
            self.inputs[n.name] = n;
        });

        //classes
        this.classes = {
            focusTip: this.namespace + "_focus_tip",
            successTip: this.namespace + "_success_tip",
            errorTip: this.namespace + "_error_tip",
            ajaxTip: this.namespace + "_ajax_checking_tip",
            focusInput: this.namespace + "_focus_input",
            successInput: this.namespace + "_success_input",
            errorInput: this.namespace + "_error_input",
            ajaxInput: this.namespace + "_ajax_checking_input"
        };
        
        this.init();
    };

    Validator.prototype = {
        constructor: Validator,

        init: function() {
            var self = this;

            //trigger when pointer focus

            if(this.$element.is("form")) {
                this.$element.on("focus", "input[type != submit], textarea", function() {
                    self.initTip($(this), self.inputs);

                    var item = $(this).data("item"),
                        whichType = item.type;
                       
                    if($(this).data("tip")) {
                       
                        self.tipFocus($(this), self.options.focusMsg[whichType]);
                    }
                });
            } else {
                this.$element.on("focus", function() {
                     self.initTip($(this), self.inputs);

                    var item = $(this).data("item"),
                        whichType = item.type;
                    if($(this).data("tip")) {
                        
                        self.tipFocus($(this), self.options.focusMsg[whichType]);
                    }
                });
            }


            //trigger when pointer moveout

            if(this.$element.is("form")) {
                this.$element.on("blur", "input[type != submit], textarea", function() {
                    self.checkIput($(this));
                });
            } else {
                this.$element.on("blur", function() {
                    self.checkIput($(this));
                });
            }


            //trigger when submit
            
            this.$element.on("submit", function(e) {
                var result = true,
                    form = $(e.target);

                $.each(form.find("input[type != submit], textarea"), function(i, n) {
                    self.initTip($(n), self.inputs);

                    result = (self.checkIput($(n)) && result);
                });

                if(!result) {
                    e.preventDefault();
                }
            });
        },

        //initial tip       
        initTip: function(input, inputs) {
            if(!input.data("tip") && input.attr("name") && inputs[input.attr("name")]) {
                var tip = $("<span class='validator_input_tip' id='error_message' style='display: none'></span>");

                input.data("tip", tip).data("item", inputs[input.attr("name")]);

                if(this.tipShow === "slidedown") {

                    //tip disappear when click
                    tip.click(function() {
                        $(this).fadeOut(400);
                    }).css("cursor", "pointer");

                }
    
                //add tip
                input.after(tip);
            }
        },

        //decide how tip show according to type
        howToShow: function(input, message, type) {
            var tip = input.data("tip"),
                showWay = this.tipShow;

            if(showWay === "slidedown") {
                this.tipSlideDown(tip, input, message, type);
            } else if(showWay === "floatleft") {
                this.tipFloatLeft(tip, input, message, type);
            } else if(showWay === "inline") {
                this.tipInline(tip, input, message, type);
            }

            input.removeClass(this.classes.focusInput)
               .removeClass(this.classes.successInput)
               .removeClass(this.classes.errorInput)
               .removeClass(this.classes.ajaxInput)
               .addClass(this.namespace + "_" + type + "_input");
        },

        tipFocus: function(input, message) {
            this.howToShow(input, message, "focus");
        },

        tipSuccess: function(input, message) {
            this.howToShow(input, message, "success");
        },

        tipError: function(input, message) {
            this.howToShow(input, message, "error");
        },

        //tip slidedown(the way of tip show)
        tipSlideDown: function(tip, input, message, type) {

             tip.removeClass(this.classes.focusTip)
                .removeClass(this.classes.rightTip)
                .removeClass(this.classes.errorTip)
                .removeClass(this.classes.ajaxTip)
                .addClass(this.namespace + "_" + type + "_tip")
                .html(message).css({
                    "position": "absolute",
                    "top": input.position().top,
                    "left": input.position().left,
                    "width": input.outerWidth(),
                    "height": input.outerHeight() + 0,
                    "textAlign": "center"
             }).slideDown(300);
        }, 

        //tip floatleft(the way of tip show)
        tipFloatLeft: function(tip, input, message, type) {

            tip.removeClass(this.classes.focusTip)
                .removeClass(this.classes.rightTip)
                .removeClass(this.classes.errorTip)
                .removeClass(this.classes.ajaxTip)
                .addClass(this.namespace + "_" + type + "_tip")
                .html(message).css({
                    "position": "absolute",
                    "top": input.position().top,
                    "left": input.position().left + input.outerWidth() + 15,
                    // "width": "100%",
                    "height": input.outerHeight() + 0,
                    "padding": "3px 0 0 0",
                    "textAlign": "center"
                }).fadeIn(400);  
        },

        //tip inline(the way of tip show)
        tipInline: function(tip, input, message, type) {

              tip.removeClass(this.classes.focusTip)
                .removeClass(this.classes.rightTip)
                .removeClass(this.classes.errorTip)
                .removeClass(this.classes.ajaxTip)
                .addClass(this.namespace + "_" + type + "_inlinetip")
                .html(message).css({
                    "display": "block",
                    "padding": "3px 0 0 0",
                    "textAlign": "left"
                }).fadeIn(400);  
        },

        //check
        checkIput: function(input) {
            var tip = input.data("tip"),
                item = input.data("item"), 
                inputType = item.type,
                result = true;

            if(tip) {

                if(item.type === "eq" && item.eqto) {
                    result =  this.checkEqual(item, input);
                } else if (this.regulars[item.type]) {
                    result = this.checkRegular(item, input);
                } else if (item.between) {
                    result = this.checkRange(item, input);
                } else if (item.type === "min") {
                    result = this.checkMin(input);
                } else if (item.type === "max") {
                    result = this.checkMax(input);
                } else if (item.type === "minlength") {
                    result = this.checkMinLength(input);
                } else if (item.type === "maxlength") {
                    result = this.checkMaxLength(input);
                } else if (item.type === "notBlank") {
                    result = this.checkNotBlank(input);
                } else {

                    // result = this.checkAjax(item, input);

                }

        
                if(result === true) {
                    this.success(input, tip);
                } else {

                    this.error(input, this.options.errorMsg[inputType]);
                }

            }

            return result;
        },

        //check equal
        checkEqual: function(item, input) {

            if(input.val() === input.closest("form").find("[name='"+ item.eqto +"']").val()) {
               
                return true;
            } else {
                
                return item.errorMsg;
            }    
        },

        //check max
        checkMax: function(input) {
            var value = input.val();

            if(value > this.max || value === "") {
                return false;
            } else {
                return true;
            }
        },

        //check min
        checkMin: function(input) {
            var value = input.val();

            if(value < this.min || value === "") {
                return false;
            } else {
                return true;
            }
        },

        //check minLength
        checkMinLength: function(input) {
            var length = input.val().length;

            if(length < this.minLength || length == 0) {
                return false;
            } else {
                return true;
            }
        },

        //check maxlength
        checkMaxLength: function(input) {
            var length = input.val().length;

            if(length > this.maxlength || length == 0) {
                return false;
            } else {
                return true;
            }
        },

        //check whether the input is blank
        checkNotBlank: function(input) {
            var value = input.val();

            if(value == "") {
                return false;
            } else {
                return true;
            }
        },

        //range
        checkRange: function(item, input) {
        
            if(input.val() >= item.between[0] && input.val() <= item.between[1]) {
                return true;
            } else {
                return false;
            }  
        },

        //match regular express 
        checkRegular: function(item, input) {
          
            var regular = this.regulars[item.type];

            if(regular.test(input.val())) {
                return true;
            } else {
                return false;
            }
        },

        //ajax
       /* checkAjax: function(item, input) {
      
            var ajax = item.ajax,
                result = false;

            this.tipStatus("ajax_checking", input, "loading...");
            $.ajax({
                url: ajax.url,
                type: "post",
                data: input.attr("name") + "=" + input.val(),
                dataType: "text",
                timeout: 5000,
                async: false,
                success: function(d) {
                    if(d === 1) {
                        this.tipStatus("right", input, ajax.successMsg);
                        result = true;
                    } else if (d === 0) {
                        this.tipStatus("error", input, ajax.errorMsg);
                        result = false;
                    } else {
                        result = false;
                    }
                },
                error: function() {
                    this.tipStatus("error", input, "internet error!!!");
                    result = false;
                }
            });

            return result;
        },*/
        


        /*
         *********public method***********
         */


        //success message display
        success: function(input, successTip, message) {
           
           this.tipSuccess(input, message);
           this.tipDispear(successTip);
        },

        //error message display
        error: function(input, message) {
           
           if($.isFunction(this.options.error)) {
                this.options.error(input, message);
           } else {
                this.tipError(input, message);
           }
        },

        //tip dispear
        tipDispear: function(successTip) {
            successTip.hide();
        },
   
        // destroy events
        destroy: function() {
            this.$element.off();
        }

    };

    Validator.defaults = {

        namespace: "validator",
        tipShow: "floatleft",    //slidedown  floatleft  inline
        min: 6,                  //the minimum value allowed to enter
        max: 12,                 //The maxmum value allowed to enter
        minLength: 3,            //Allowed to enter the minimum number of characters
        maxlength: 8,            //Allowed to enter the maximum number of characters

        //default regulars
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

        //the messages when focus
        focusMsg: {
            english: "Only enter English characters as the user name",
            chinese: "Only enter Chinese characters as the user name",
            email: "Enter a useful email",
            password: "Enter more than 6 characters(1-9/A-z/_)",
            eq: "The same password as above",
            age: "1~100",
            date: "Should like(YYYY-MM-DD)",
            number: "All number",
            min: "Greater than 6",
            max: "Less than 12",
            minlength: "The number of characters input should be more then 3",
            maxlength: "The number of characters input should be smaller than 8",
            notBlank: "You can enter any characters you like"
        },

        //the default error message;
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
            phone: "Invalid teliphone number"
        },

        inputs: [],
        button: null,
        onButtonClick: $.noop,
        beforSubmit: $.noop
    };

    $.fn.validator = function(options) {

        if(typeof options === "string") {
            var method = options;
            var method_arguments = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined;

            return this.each(function() {
                var api = $.data(this, "validator");
                if(typeof api[method] === "function") {
                    api[method].apply(api, method_arguments);
                }
            });
        } else {
            return this.each(function() {
                if(!$.data(this, "validator")) {
                    $.data(this, "validator", new Validator(this, options));
                }
            });
        }
    };
  
}(jQuery));
