require('spinner');

App.Client = Ember.View.extend({
  
  templateName: 'twitter-client/~templates/client',
  
  classNames: ['client', 'window', 'window-depth'],
  
  init: function() {
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
    
    this.set('spinner', new Spinner(opts));
  },
  
  spinnerOn: function() {
    this.get('spinner').spin(this.get('element'));
  },
  
  spinnerOff: function() {
    this.get('spinner').stop();
  },

  compose: function () {
    this.get('controller').send('compose');
  },
  
  signout: function() {
    this.get('controller').send('signout');
  }
  
});

App.Client.DEFAULT_WIDTH = 420;