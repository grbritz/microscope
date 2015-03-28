Template.commentItem.helpers({
  whenSubmitted: function() {
    if(this.submitted) {
      return moment(this.submitted).fromNow();
    }
    else {
      return "before the beginning of time";
    }
  }
});