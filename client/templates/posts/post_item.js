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
  numComments: function() {
    return Comments.find({postId: this._id}).count();
  }
});