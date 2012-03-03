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
      body: obj['text'],
      createdAt: new Date(Date.parse(obj['created_at'])),
      profilePicURL: obj['user']['profile_image_url_https'],
      htmlBody: function () {
        var body = this.get('body');
        // Parse URIs
        body = body.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g, function(uri) {
      		return '<a href="%@" target="_blank" class="link">%@</a>'.fmt(uri, uri);
      	});

        // Parse Twitter usernames
        body = body.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
      		var username = u.replace("@","")
      		return '<a href="%@" target="_blank" class="username label label-info">%@</a>'.fmt("http://twitter.com/"+username, u);
      	});

      	// Parse Twitter hash tags
      	body = body.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
      		var tag = t.replace("#","%23");
      		return '<a href="%@" target="_blank" class="hashtag label label-warning">%@</a>'.fmt("http://search.twitter.com/search?q="+tag, t);
      	});
        return body;
      }.property('body').cacheable()
    });
  }
  
});