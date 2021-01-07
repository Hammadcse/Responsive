/**
 * notofy.js v0.1
 * https://qcode.site
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

!(function($, win, doc) {
    'use strict';
    var _doc = $(doc),
        notify = 'notify',
        error = function(e) {
            throw 'error: Cannot Notify => ' + e;
        },
        warn = function(l) {
            (console.warn == 'undefiend') ? console.log('Notify Warning: ' + l) : console.warn('Notify Warning: ' + l);
        },
        in_array = function(array, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === value) return true;
            }
            return false;
        },
        closeNotify = function(button) {
			var timer;
			clearTimeout(timer);
            button.parents('.' + notify + '__item').removeClass('show');
            setTimeout(function() {
                button.parents('.' + notify + '__item').addClass('hide');
            }, 25);
            timer = setTimeout(function() {
                button.parents('.' + notify).remove();
            }, 300);
        },
        initialize = function(set) {
            var noty = doc.createElement('div'),
                main = doc.createElement('div'),
                wrapper = doc.createElement('div'),
                aside = doc.createElement('aside'),
                img = doc.createElement('img'),
                title = doc.createElement('div'),
                span = doc.createElement('span'),
                text = doc.createElement('div'),
                close = doc.createElement('button');
            noty.className = '' + notify + '';
            main.className = '' + notify + '__item show';
            if(set.type == 'error') {
                var icon = '/img/error_n.svg';
                var type = 'Error';
            } else if(set.type == 'success') {
                var icon = '/img/success_n.svg';
                var type = 'Success';
            } else if(set.type == 'warning') {
                var icon = '/img/warning.svg';
                var type = 'Warning';
            } else if(set.type == 'info') {
                var icon = '/img/info.svg';
                var type = 'Info';
            };
            wrapper.className = notify + '__item-wrap '+type+'';
            aside.className = notify + '__aside';
            title.className = notify + '__title';
            text.className = notify + '__message';
            close.className = notify + '__close';
            var addurdrt = '<div class="undrnt">  <div class="undernotify"></div> </div>';
			img.setAttribute('src', icon);
			img.style.width = "30px";
            doc.body.appendChild(noty);
            noty.appendChild(main);
            main.appendChild(wrapper);
            aside.appendChild(img);
            title.appendChild(span);
            span.innerText = type;
            close.innerText = '×';
            wrapper.insertAdjacentHTML('beforeend', addurdrt);
            wrapper.appendChild(aside);
            wrapper.appendChild(title);
            wrapper.appendChild(text);
            wrapper.appendChild(close);
            text.innerHTML = set.message;
            if(set.autohide == true) {
                setTimeout(function() {
                    closeNotify($(close));
                }, set.autohideDelay)
            }
            $('audio#notification')[0].volume = 0.3;
            $('audio#notification')[0].play();
        };
    $.notify = function(options) {
        var types = ['error', 'success', 'warning', 'info'],
            settings = {
                message: '',
                type: '',
                autohide: true,
                autohideDelay: 3000,
            };
        $.extend(settings, options);
        if(settings.type == '' && !settings.type.length) error('Type is not defined!');
        if(!in_array(types, settings.type)) error('Uhh, invalid notify type!');
        if(settings.message == '' && !settings.message.length) error('Hmmm, Message seems to be empty or not defined!');
        if($('.' + notify).length) {
            closeNotify($('.' + notify).find('.' + notify + '__close'));
        }
        initialize(settings);
    };
    _doc.on('click', '.notify__close', function() {
        closeNotify($(this));
    });

})(window.jQuery, window, document)
