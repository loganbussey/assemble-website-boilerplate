module.exports.register = (Handlebars) => {
  Handlebars.registerHelper('markdown', require('helper-markdown')());
  Handlebars.registerHelper('md', require('helper-md').sync);
};
