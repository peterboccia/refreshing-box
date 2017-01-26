/**
 * refreshingBox.js
 * @author: Peter Boccia
 * @version: 1.0.00 - 2017-01-23 GMT 14:00 PM
 *
 * Created by Pietro Boccia on 2017-01-20
 * Contributor 
 *
 * Copyright (c) 2017 Pietro Boccia http://www.peterboccia.altervista.org
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
(function ($) {
    $.widget("ui.refreshingBox", {

        options: { },

        _create: function () {

            // merge default and internals
            this.options = $.extend({}, $.fn.refreshingBox.defaults, this.options);

            // Read local variables
            var self = this;
            var elem = this.element;
            var o = self.options;
			
			var inputId = '';
			
			if(o.inputId != ''){
				inputId = o.inputId;
			}
			else {
				inputId = elem.index() + '_input-refreshing-box';
			}
			
			o.cssLabel = 'col-md-11 col-sm-10 col-xs-8 text-right';
			o.cssSwitch = 'col-md-1 col-sm-2 col-xs-4 text-left';

            // create the switch and the label
			$descriptionLabel = $('<label/>').attr('for', inputId).html(o.description);
            $labelSwitch = $('<label/>').addClass('switch');
            $inputSwitch = $('<input/>').attr('type', 'checkbox').attr('id', inputId).appendTo($labelSwitch);
            $uidivSwitch = $('<div/>').addClass('slider round').appendTo($labelSwitch);
			
			// if defined set the name to this input
			if(o.inputName != ''){
				$inputSwitch.attr('name', o.inputName);
			}

            if(o.table){
                $table = $('<table/>').addClass('refreshing-box');
                $tr = $('<tr/>').appendTo($table);

                $tdDescription = $('<td/>').addClass('cell-description').appendTo($tr).append($descriptionLabel);

                $tdSwitch = $('<td/>').addClass('cell-switch').appendTo($tr).append($labelSwitch);
                
                elem.append($table);
            }
            else {
                // add the refreshing-box style class
                elem.addClass('refreshing-box');

                $descriptionDiv = $('<div/>').addClass(o.cssLabel).append($descriptionLabel);

                $switchContainer = $('<div/>').addClass(o.cssSwitch).append($labelSwitch);
                
                elem.append($descriptionDiv);
                elem.append($switchContainer);
            }


            // bind the change event
            $inputSwitch.change(function () {
                if ($(this).prop('checked')) {
                    self.status = true;

                    if (o.onStart && typeof (o.onStart) === "function") {
                        o.onStart();
                    }

                    self._manageRefreshing();
                }
                else {
                    self.status = false;

                    if (o.onStop && typeof (o.onStop) === "function") {
                        o.onStop();
                    }

                    self._manageRefreshing();
                }
            });

            self.checkInput = $inputSwitch;


            self.status = o.checked;
			if(self.status){
				$inputSwitch.prop('checked', true).change();
			}
            return this;
        },

        _manageRefreshing: function () {
            var o = this.options;
            if (this.status) {
                // clear whatever
                clearInterval(this.ref);
                // start a new interval
                this.ref = setInterval(function () {
                    if (o.onRefresh && typeof (o.onRefresh) === "function") {
                        o.onRefresh();
                    }
                }, o.interval);
            }
            else {
                // stop the interval
                clearInterval(this.ref);
            }
        },

        _destroy: function () {

            clearInterval(this.ref);

        },

        // Create a public method.
        value: function (value) {

            // No value passed, act as a getter.
            if (value === undefined) {
                return this.status;
            }

            this.status = value;

            this.checkInput.prop('checked', value).change();
        }
    });

    // Plugin defaults – added as a property on our plugin function.
    $.fn.refreshingBox.defaults = {
        description: 'Enable automatic task',
        interval: 3000,
		inputName: '',
		inputId: '',
        checked: false,
        table: false,
        onRefresh: function () { },
        onStop: function () { },
        onStart: function () { }
    };

})(jQuery);