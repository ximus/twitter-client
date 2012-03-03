require('twitter-client/core');
require('twitter-client/views/auth');
require('twitter-client/views/client');
require('twitter-client/controllers/client');

App.MainController = Ember.StateManager.extend({
  
  initialState: 'idle',
  
  authView: App.Auth.create(),
  
  idle: Ember.State.create({
    
    enter: function(stateManager) {
      this._super(stateManager);
      
      var container = stateManager.get('rootView');      

      container.positionPlaceholder();
      container.showPlaceholder();
    },
    
    exit: function (stateManager) {
      this._super(stateManager);
      
      var container = stateManager.get('rootView');      

      container.hidePlaceholder();
    },
    
    newClientRequested: function (stateManager) {
      stateManager.goToState('signin');
    }
    
  }),
  
  signin: Ember.State.create({

    enter: function(stateManager) {
      this._super(stateManager);
      
      var container = stateManager.get('rootView'),
          login     = container.get('loginView');
      
      container.positionLogin();
      login.clear();
      login.show();
      login.focus();
    },
    
    exit: function(stateManager) {
      this._super(stateManager);
      
      var container = stateManager.get('rootView'),
          login     = container.get('loginView');
      
      login.hide();
    },
    
    loginRequested: function (stateManager) {
      stateManager.goToState('auth');
    },
    
    loginCancel: function (stateManager) {
      stateManager.goToState('idle');
      container.get('loginView').clear();
    }
  }),
  
  auth: Ember.State.create({

    enter: function(stateManager) {
      this._super(stateManager);
      
      var auth      = stateManager.get('authView'),
          container = stateManager.get('rootView'),
          login     = container.get('loginView');
      
      auth.doAuth(login.get('screenName'));
    },
    
    exit: function(stateManager) {
      this._super(stateManager);
      
      var auth = stateManager.get('authView');
      
      auth.close();
    },
    
    authComplete: function(stateManager, context) {
      var client    = App.Client.create(context),
          container = stateManager.get('rootView'),
          auth      = stateManager.get('authView'),
          controller;
          
      controller = App.ClientController.create({
        rootView: client
      });
      
      client.set('controller', controller);  
      
      container.addClient(client);
      
      auth.close();
      Ember.run.next(function() {
        controller.send('getTweets');
        stateManager.goToState('idle');
      });
    },
    
    authClosed: function (stateManager, context) {
      stateManager.goToState('idle');
    }
  }),
  
  compose: function (stateManager, context) {
    var client    = context.client,
        container = stateManager.get('rootView'),
        compose   = container.get('composeView');
        
     console.log('Main compose');
        
    if (!compose.get('isOpen')) {
      compose.set('client', client);
      if (context.initialText) compose.set('value', context.initialText);
      compose.set('callback', context.callback);
      compose.show();
    }     
  }
  
});