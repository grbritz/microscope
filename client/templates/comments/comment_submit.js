Template.commentSubmit.created = function() {
  Session.set('commentSubmitErrors', {});
};

Template.commentSubmit.helpers({
  errorMessage : function(field) {
    return Session.get('commentSubmitErrors')[field];
  },
  errorClass : function(field) {
    return !!Session.get('commentSubmitErrors')[field] ? "has-error" : "";
  }
});

Template.commentSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var $body = $(e.target).find("[name=body]");
    var comment = {
      body: $body.val(),
      postId: template.data._id
    };

    var errors = {};
    if(! comment.body) {
      errors.body = "Please write something to comment";
      return Session.set('commentSubmitErrors', errors);
    }

    Meteor.call('commentInsert', comment, function(error, result){
      if(error) {
        Errors.throw(error.reason);
      }
      else {
        $body.val('');
      }
    });
  }
});