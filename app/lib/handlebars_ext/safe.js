Handlebars.registerHelper('safe', function(property) {
  return new Handlebars.SafeString(Ember.getPath(this, property));
});