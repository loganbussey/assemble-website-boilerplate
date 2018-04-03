import jQuery from 'jquery';
global.$ = global.jQuery = jQuery;

import 'bootstrap';

$(document).ready(() => {
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
});
