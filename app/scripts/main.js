import jQuery from 'jquery';
import 'bootstrap';

global.$ = global.jQuery;
global.$ = jQuery;

global.$(document).ready(() => {
  global.$('[data-toggle="tooltip"]').tooltip();
  global.$('[data-toggle="popover"]').popover();
});
