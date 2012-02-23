App.Auth = Ember.Object.extend({
  
  popup: null,
  
  init: function() {
    
  },
  
  doAuth: function (screenName) {
    if (this.get('popup')) this.close();
    this.open(screenName);
  },
  
  open: function (screenName) {
    var popup,
        path = '/api/auth/twitter?screen_name=' + screenName;
    
    popup = window.open(path, 'Twitter', 'location=0,status=0,width=800,height=518');
    this.set('popup', popup);
    
    this.oauthInterval = window.setInterval($.proxy(function() {
      if (popup.closed) {
        window.clearInterval(this.oauthInterval);
      } 
    }, this), 600);
  },
  
  close: function () {
    var popup = this.get('popup');
    if (popup) {
      window.clearInterval(this.oauthInterval);
      this.get('popup').close();
      this.set('popup', null);
    }
  }
})