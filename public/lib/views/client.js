require('spinner');

App.Client = Ember.View.extend({
  
  templateName: 'twitter-client/~templates/client',
  
  classNames: ['client', 'window', 'window-depth'],
  
  didInsertElement: function() {
    this._super();
    var opts = {
      lines: 12, // The number of lines to draw
      length: 10, // The length of each line
      width: 4, // The line thickness
      radius: 11, // The radius of the inner circle
      color: '#000', // #rgb or #rrggbb
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: true, // Whether to render a shadow
      hwaccel: true // Whether to use hardware acceleration
    };
    var spinner = $('<div class="spinner hide"></div>');
    this.$().append(spinner);
    Ember.run.next(function() {
      new Spinner(opts).spin(spinner.get(0));
    });
    this.set('$spinner', spinner)
  },
  
  spinnerOn: function() {
    this.get('$spinner').removeClass('hide');
  },
  
  spinnerOff: function() {
    this.get('$spinner').addClass('hide');
  },

  compose: function () {
    this.get('controller').send('compose');
  },
  
  signout: function() {
    this.get('controller').send('signout');
  }
  
});

App.Client.DEFAULT_WIDTH = 420;