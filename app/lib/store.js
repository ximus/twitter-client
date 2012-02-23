require('twitter-client/core');

var proxyURL = function(url) {
  return '/api/proxy?url=' + encodeURIComponent(url);
};

App.Store = Ember.Object.create({
  
  getTimeline: function (uid, callback) {
    var url = proxyURL('/1/statuses/home_timeline.json');
    url = url + '&user_id=' + uid;
    $.getJSON( url, $.proxy(function(results) {
      var ret = [];
      for (var i = results.length - 1; i >= 0; i--) {
        ret[i] = this.toTweet(results[i]);
      }
      callback(Ember.A(ret));
    }, this));
  },
  
  doTweet: function (uid, text, callback) {
    var url = proxyURL('/1/statuses/update.json?status='+encodeURIComponent(text)), data;
    url = url + '&user_id=' + uid;
    data = {};
    $.post(url, data, $.proxy(function(results) {
      callback();
    }, this));
  }, 
  
  // @private
  toTweet: function(obj) {
    return Ember.Object.create({
      screenName: obj['user']['screen_name'],
      name: obj['user']['name'],
      text: obj['text'],
      createdAt: new Date(Date.parse(obj['created_at'])),
      profilePicURL: obj['user']['profile_image_url_https']
    });
  }
  
});