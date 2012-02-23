require('twitter-client/core');
require('twitter-client/controllers/main');
require('twitter-client/views/main_container');
                                                 

var mainContainer = App.MainContainer.create();

mainContainer.append();
Ember.run.next(function() {
  mainContainer.initialize();
  App.mainController = App.MainController.create({
    rootView: mainContainer
  });
})




App.mainContainer = mainContainer;