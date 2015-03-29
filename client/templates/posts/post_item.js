Template.postItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  whenSubmitted: function() {
    if(this.submitted) {
      return moment(this.submitted).fromNow();
    }
    else {
      return "before the beginning of time";
    }  
  },
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
  upvotedBtnClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    }
    else {
      return 'disabled';
    }
  }
});

Template.postItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});