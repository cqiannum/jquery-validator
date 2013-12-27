/*! jQuery Validator - v0.1.0 - 2013-12-25
* https://github.com/void/jquery-validator
* Copyright (c) 2013 cqiannum; Licensed MIT */
(function($) {

  // Collection method.
  $.fn.jquery_validator = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.jquery_validator = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.jquery_validator.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.jquery_validator.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].jquery_validator = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
