Handlebars.registerHelper('cap', function(property) {
  var value = Ember.getPath(this, property);
  function convertToUpper() { return arguments[0].toUpperCase(); }
  if (value) {
    return value.toLowerCase().replace(/\b[a-z]/g, convertToUpper);
  }
});