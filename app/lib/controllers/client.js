require('twitter-client/store');

App.ClientController = Ember.StateManager.extend({
  
  initialState: 'idle',
  
  idle: Ember.State.create({
    
    enter: function(stateManager) {
      this._super(stateManager);
    },
    
    exit: function (stateManager) {
      this._super(stateManager);
    },
    
    getTweets: function(stateManager) {
      var uid = stateManager.getPath('rootView.uid');
      
      stateManager.goToState('loading');
      App.Store.getTimeline(uid, function(results) {
        stateManager.send('timelineLoaded', results);
      });
    },
    
    compose: function (stateManager) {
      var client = stateManager.get('rootView');
      
      console.log('Client compose');
      
      App.mainController.send('compose', {
        client: client,
        callback: function(text) {
          App.Store.doTweet(client.get('uid'), text, function() {
            alert('Tweeted!');
          });
        }
      })
    }
    
  }),
  
  loading: Ember.State.create({
    
    enter: function(stateManager) {
      this._super(stateManager);
      
      var client = stateManager.get('rootView');      

      client.spinnerOn();
    },
    
    exit: function (stateManager) {
      this._super(stateManager);
      
      var client = stateManager.get('rootView');      

      client.spinnerOff();
    },
    
    timelineLoaded: function (stateManager, results) {
      var client = stateManager.get('rootView');
      
      client.set('tweets', results);
      stateManager.goToState('idle');
    }
    
  }),
  
 signout: function(stateManager) {
   var client = stateManager.get('rootView');
   App.mainContainer.removeClient(client);
 }
});