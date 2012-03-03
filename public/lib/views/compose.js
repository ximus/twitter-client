App.Compose = Ember.View.extend({
  
  templateName: 'twitter-client/~templates/compose',
  
  classNames: ['compose', 'modal', 'fade', 'window-depth', 'hide'],
  
  didInsertElement: function() {
    this._super();
    this.$().modal({ show: false });
    this.$().on('hidden', $.proxy(function() {
      this.$().addClass('hide');
    }, this));
    
    this.updateButtonState();
  },

  show: function () {      
    this.updateButtonState();
    this.$().removeClass('hide');
    this.$().modal('show');
  },
  
  hide: function () {
    this.$().modal('hide');
  },
  
  isOpen: function() {
    return !this.$().hasClass('hide');
  }.property(),
  
  isValid: function() {
    var value = this.get('value');
    return (value && value.length <= this.maxChars && value.length !== 0);
  }.property('value'),
  
  _value: null,
  
  value: Ember.computed(function(key, value) {
    if (arguments.length === 1) { // getter 
      return this._value;
    } else { // setter
      return this._value = value;
    }
  }).property(),
  
  numOfChars: function() {
    var value = this.get('value');
    return value ? value.length : 0;
  }.property('value'),
  
  keyUp: function(e) {
    if (e.keyCode === 13) { // Enter
    }
    else if (e.keyCode === 27) { // Escape
    }
    else {
    }
  },
  
  maxChars: 140,
  
  charsLeft: function() {
    return this.maxChars - this.get('numOfChars');
  }.property('numOfChars').cacheable(),
  
  send: function() {
    var callback = this.get('callback'),
        text = this.get('value');       
        
    if (text && this.get('isValid')) {
      callback(text);
    }
  },
  
  updateButtonState: function() {
    if (this.get('isValid')) 
      this.$('.btn-primary').removeClass('disabled');
    else
      this.$('.btn-primary').addClass('disabled');
  }.observes('value')
  
});

// App.Compose.MAX_NUM_CHARS = 140;