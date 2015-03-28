Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var submittedPost = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }

    var errors = validatePost(submittedPost);
    if (errors.title || errors.url) {
      return Session.set('postSubmitErrors', errors);
    }

    // submittedPost._id = Posts.insert(submittedPost);
    Meteor.call('postInsert', submittedPost, function(error, result){
      if (error) {
        return Errors.throw(error.reason);
      }

      if (result.postExists) {
        Errors.throw('This link has already been posted');
      }

      Router.go('postPage', {_id: result._id});  
    });
  }
});

Template.postSubmit.created = function() {
  Session.set('postSubmitErrors', {});
};

Template.postSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});