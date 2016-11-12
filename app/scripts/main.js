'use strict';

import jQuery from 'jquery';
import Tether from 'tether';

global.$ = global.jQuery = jQuery;
global.Tether = Tether;

require('bootstrap');

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
});
