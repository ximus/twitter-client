require('twitter-client/utils/date');

// TODO: Time changes, the UI should take that into account.
Handlebars.registerHelper('since', function(property) {
  var value = Ember.getPath(this, property),
      diff  = DateUtil.difference(new Date(), value),
      ret = "";
      
  if (diff.months > 0) {
    return diff.months + "mth" + (diff.days > 1 ? ' %@d'.fmt(diff.days) : '');
  }
  else if (diff.days > 0) {
    return diff.days + "d" + (diff.hours > 0 ? ' %@h'.fmt(diff.hours) : '');
  }
  else if (diff.hours > 0) {
    return diff.hours + "h" + (diff.minutes > 0 ? ' %@m'.fmt(diff.minutes) : '');
  }
  else if (diff.minutes > 0) {
    return diff.minutes + "m";
  }
  else {
    return diff.seconds + "s";
  }
  
});