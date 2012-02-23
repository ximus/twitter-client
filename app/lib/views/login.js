App.Login = Ember.View.extend({
  
  templateName: 'twitter-client/~templates/login',
  
  classNames: ['login', 'window', 'window-depth', 'hide', 'wobble'],
  
  didInsertElement: function() {
    this._super();
    
    this.$input = this.$('input');
    this.$input.keyup($.proxy(function(event) {
      if (event.keyCode === 13) { // Enter key
        this.login();
      }
      if (event.keyCode === 27) { // Enter key
        Ember.getPath('App.mainController').send('loginCancel');
      } 
    }, this));
  },
  
  hide: function () { 
    this.$().fadeOut('fast');
    this.$().addClass('hide');
  },
  
  show: function () {
    this.$().fadeIn('fast'); 
    this.$().removeClass('hide');
  },
  
  focus: function() {
    this.$input.focus();
  },
  
  clear: function() {
    this.$input.val('');
  },
  
  screenName: function() {
    var name = this.$input.val();
    return name ? name : null;
  }.property(),
  
  login: function() {
    var name = this.get('screenName');
    if (name !== null) {
      Ember.getPath('App.mainController').send('loginRequested');
    } else {
      this.$().addClass('animated');
      setTimeout($.proxy(function() {
        this.$().removeClass('animated');
      }, this), 1000); 
    }
  }
  
  
});