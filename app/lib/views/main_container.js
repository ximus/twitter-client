require('twitter-client/views/client');
require('twitter-client/views/login');
require('twitter-client/views/compose');

App.MainContainer = Ember.ContainerView.extend({
  
  elementID: 'app-container',
  
  clients: [],
  
  classNames: ['windows-container'],
  
  $placeholder: $('<div class="placeholder invisible">'),
  
  loginView: App.Login.create(),
  
  composeView: App.Compose.create(),
  
  initialize: function () {
    var $placeholder = this.$placeholder;
    this.$().append($placeholder);
    $placeholder.click($.proxy(this.placeholderClicked, this));
    
    // Add the login box
    this.get('childViews').pushObject(this.loginView);
    // Add the compose box
    this.get('childViews').pushObject(this.composeView);
  },
  
  showPlaceholder: function() {
    this.$placeholder.removeClass('invisible');
  },
  
  hidePlaceholder: function() {
    this.$placeholder.addClass('invisible');
  },
  
  positionPlaceholder: function() {
    var $placeholder = this.$placeholder,
        left, top; 
        
    //  Vertically centered                                         
    top   = ( this.$().height()   - $placeholder.height() ) / 2;
    left  = ( App.Client.DEFAULT_WIDTH - $placeholder.width() )  / 2;
    left += this.get('currentOffset');
    left += App.MainContainer.SPACING; 
    
    $placeholder.offset({ top: top, left: left });
  },
  
  addClient: function(client) {
    this.get('clients').pushObject(client);
    this.get('childViews').pushObject(client);
    // Will someone one day explain me why I have to do this?
    Ember.run.next(this, 'positionClients');
  },
  
  positionClients: function () {
    var clients = this.get('clients'),
        client, left = 0;
        
    for (var i=0; i < clients.length; i++) {
      client = clients[i];
      left += App.MainContainer.SPACING;
      // Position it offscreen
      client.$().css({ left: this.$().width() + App.MainContainer.SPACING });
      Ember.run.next(function (left, client) {
        console.log(left);
        // Then slide it in
        return function() { client.$().css({ left: left }); };
      }(left, client)); // Pass by value
      left += client.$().width();
      console.log("WIDDDTH " + client.$().width());
    };
    this._currentOffset = left;
  },
  
  currentOffset: function() {
    return this._currentOffset || 0;
  }.property('clients'),
  
  placeholderClicked: function () {
    Ember.getPath('App.mainController').send('newClientRequested');
  },
  
  positionLogin: function () {
    var login = this.get('loginView'),
        left = 0, top = 0;
    //  Vertically centered
    top   = ( this.$().height() - login.$().height() ) / 2;
    left  = ( App.Client.DEFAULT_WIDTH - login.$().width() )  / 2;
    left += this.get('currentOffset');
    left += App.MainContainer.SPACING;
    
    login.$().offset({ top: 0, left: 0 });
    login.$().css({ top: top, left: left });
  }
  
});

App.MainContainer.SPACING = 34;